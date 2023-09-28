import { CommentDB } from "../database/CommentDatabase";
import { PostDatabase, PostDB, postUpvoteDownvoteDB } from "../database/PostDatabase";
import { UserDB } from "../database/UserDatabase";
import { DeletePostOutputDTO, EditPostOutputDTO, CreatePostOutputDTO, UpvoteOrDownvotePostOutputDTO, GetPostByIdOutputDTO } from "../dtos/PostDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export interface PostBusinessModel {
  id: string,
  creatorId: string,
  content: string,
  upvote: number,
  downvote: number,
  comments: number,
  createdAt: string,
  updatedAt: string
}

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ) { }

  public getPosts = async (token: string): Promise<{}[]> => {

    //permission check
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    const postsDB: PostDB[] = await this.postDatabase.getPosts(undefined)

    let allPosts: {}[] = []
    for (const post of postsDB) {
      const postCreator: UserDB = await this.postDatabase.getCreator(post.creator_id)
      const commentsByPostId: CommentDB[] = await this.postDatabase.getCommentsByPostId(post.id)

      let commentsOfPost: {}[] = []
      for (const comment of commentsByPostId) {
        const commentCreator: UserDB = await this.postDatabase.getCreator(comment.creator_id)
        commentsOfPost.push(
          {
            id: comment.id,
            creatorNickname: commentCreator.nickname,
            content: comment.content,
            upvote: comment.upvote,
            downvote: comment.downvote,
            createdAt: comment.created_at,
            updatedAt: comment.updated_at
          }
        )
      }

      const postDataVote = {
        post_id: post.id,
        user_id: payload.id,
        vote: 3
      }

      const postVote = await this.postDatabase.findPostUpvoteDownvote(postDataVote)

      allPosts.push(
        {
          loggedUser: payload.nickname,
          id: post.id,
          creatorNickname: postCreator.nickname,
          content: post.content,
          vote: postVote,
          upvote: post.upvote,
          downvote: post.downvote,
          createdAt: post.created_at,
          updatedAt: post.updated_at,
          comments: commentsOfPost
        }
      )
    }
    
    return allPosts
  }

  public getPostById = async (input: GetPostByIdOutputDTO): Promise<{}> => {
    const { id, token } = input

    const postDB: PostDB | undefined = await this.postDatabase.getPostById(id)
    if (!postDB) {
      throw new NotFoundError("ERROR: 'id' not found.")
    }

    //permission check
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    const postCreator: UserDB = await this.postDatabase.getCreator(postDB.creator_id)
    const commentsByPostId: CommentDB[] = await this.postDatabase.getCommentsByPostId(id)

    let commentsWithCreator: {}[] = []
    for (const comment of commentsByPostId) {
      const commentDataVote = {
        comment_id: comment.id,
        user_id: payload.id,
        vote: 3
      }

      const commentVote = await this.postDatabase.findCommentUpvoteDownvote(commentDataVote)

      const commentCreator: UserDB = await this.postDatabase.getCreator(comment.creator_id)
      commentsWithCreator.push(
        {
          id: comment.id,
          creatorNickname: commentCreator.nickname,
          content: comment.content,
          commentVote: commentVote,
          upvote: comment.upvote,
          downvote: comment.downvote,
          createdAt: comment.created_at,
          updatedAt: comment.updated_at
        }
      )
    }

    const postDataVote = {
      post_id: id,
      user_id: payload.id,
      vote: 3
    }

    const postVote = await this.postDatabase.findPostUpvoteDownvote(postDataVote)

    const postWithComments = {
      loggedUser: payload.nickname,
      id: postDB.id,
      creatorNickname: postCreator.nickname,
      content: postDB.content,
      postVote: postVote,
      upvote: postDB.upvote,
      downvote: postDB.downvote,
      createdAt: postDB.created_at,
      updatedAt: postDB.updated_at,
      comments: commentsWithCreator
    }

    commentsWithCreator = []

    return postWithComments
  }

  public createPost = async (input: CreatePostOutputDTO): Promise<void> => {
    const { token, content } = input

    //login ckeck
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    //characters quantity
    if (content.length > 280) {
      throw new BadRequestError("ERROR: The maximum post length is 280 characters.")
    }

    const newPost = new Post(
      this.idGenerator.generate(),
      payload.id,
      content,
      0,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    )

    await this.postDatabase.insertPost(newPost.toDBModel())
  }
  
  public upvoteOrDownvotePost = async (input: UpvoteOrDownvotePostOutputDTO): Promise<void> => {
    const { idToVote, token, vote } = input
    
    const postDB: PostDB | undefined = await this.postDatabase.getPostById(idToVote)
    if (!postDB) {
      throw new NotFoundError("ERROR: 'idToVote' not found")
    }
    
    //login ckeck
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }
    
    const voteDB = vote ? 1 : 0
    
    const postUpvoteDownvoteDB: postUpvoteDownvoteDB = {
      post_id: postDB.id,
      user_id: payload.id,
      vote: voteDB
    }
    
    const post = new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.upvote,
      postDB.downvote,
      postDB.comments,
      postDB.created_at,
      postDB.updated_at
      )
      
      const postUpvoteDownvote = await this.postDatabase.findPostUpvoteDownvote(postUpvoteDownvoteDB)
      
      //upvote or downvote check 
      if (postUpvoteDownvote === "up") { //alreary upvoted
        if (vote) {
          await this.postDatabase.removeUpvoteDownvote(postUpvoteDownvoteDB)
          post.removeUpvote()
        } else {
          await this.postDatabase.updateUpvoteDownvote(postUpvoteDownvoteDB)
          post.removeUpvote()
          post.addDownvote()
        }
      } else if (postUpvoteDownvote === "down") { //alreary downvoted
        if (vote) {
          await this.postDatabase.updateUpvoteDownvote(postUpvoteDownvoteDB)
          post.removeDownvote()
          post.addUpvote()
        } else {
          await this.postDatabase.removeUpvoteDownvote(postUpvoteDownvoteDB)
          post.removeDownvote()
        }
      } else {
        await this.postDatabase.upvoteDownvotePost(postUpvoteDownvoteDB)
        voteDB ? post.addUpvote() : post.addDownvote()
      }
      
      await this.postDatabase.updatePost(idToVote, post.toDBModel())
  }

    
    //=====================================
    //ENDPOINTS NOT USED IN MOBILE VERSION
    //=====================================

    // public editPost = async (input: EditPostOutputDTO): Promise<void> => {
    //   const { idToEdit, token, content } = input
  
    //   const postDB = await this.postDatabase.getPostById(idToEdit)
    //   if (!postDB) {
    //     throw new NotFoundError("ERROR: 'idToEdit' not found.")
    //   }
  
    //   //login ckeck
    //   const payload = this.tokenManager.getPayload(token)
    //   if (payload === null) {
    //     throw new BadRequestError("ERROR: Login failed")
    //   }
  
    //   if (postDB.creator_id !== payload.id) {
    //     throw new ForbiddenError("ERROR: There's no permission to complete the request.")
    //   }
  
    //   //characters quantity
    //   if (content.length > 280) {
    //     throw new BadRequestError("ERROR: The maximum post length is 280 characters.")
    //   }
  
    //   const newPost = new Post(
    //     postDB.id,
    //     postDB.creator_id,
    //     postDB.content,
    //     postDB.upvote,
    //     postDB.downvote,
    //     postDB.comments,
    //     postDB.created_at,
    //     postDB.updated_at
    //   )
  
    //   newPost.setContent(content)
    //   newPost.setUpdatedAt(new Date().toISOString())
  
    //   await this.postDatabase.updatePost(idToEdit, newPost.toDBModel())
    // }
  
    public deletePost = async (input: DeletePostOutputDTO): Promise<void> => {
      const { idToDelete, token } = input
  
      const postDB: PostDB | undefined = await this.postDatabase.getPostById(idToDelete)
      if (!postDB) {
        throw new NotFoundError("ERROR: 'idToDelete' not found.")
      }
  
      //login ckeck
      const payload = this.tokenManager.getPayload(token)
      if (payload === null) {
        throw new BadRequestError("ERROR: Login failed.")
      }
  
      //permission check
      if (payload.role !== USER_ROLES.ADMIN && postDB.creator_id !== payload.id) {
        throw new ForbiddenError("ERROR: There's no permission to complete the request.")
      }
  
      await this.postDatabase.deletePost(idToDelete)
    }
  }