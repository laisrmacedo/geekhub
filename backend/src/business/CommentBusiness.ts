import { CommentDatabase, CommentDB, commentUpvoteDownvoteDB } from "../database/CommentDatabase";
import { PostDatabase, PostDB } from "../database/PostDatabase";
import { CreateCommenteOutputDTO, DeleteCommentOutputDTO, EditCommentOutputDTO, GetCommentsOutputDTO, UpvoteOrDownvoteCommentOutputDTO } from "../dtos/CommentDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { Comment } from "../models/Comment";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export interface CommentBusinessModel {
  id: string, 
  creatorId: string,
  postId: string,
  content: string, 
  upvote: number,
  downvote: number,
  createdAt: string,
  updatedAt: string
}

export class CommentBusiness {
  constructor(
    private commentDatabase: CommentDatabase,
    private postDatabase: PostDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ){}

  public getComments = async (input: GetCommentsOutputDTO): Promise<CommentBusinessModel[]> => {
    const { token } = input

    //permission check
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    const commentsDB: CommentDB[] = await this.commentDatabase.getComments()
    const comments = commentsDB.map((commentDB) => {
      const comment = new Comment(
        commentDB.id,
        commentDB.creator_id,
        commentDB.post_id,
        commentDB.content,
        commentDB.upvote,
        commentDB.downvote,
        commentDB.created_at,
        commentDB.updated_at
      )
      return comment.toBusinessModel()
    })

    return comments
  }

  public createComment = async (input: CreateCommenteOutputDTO): Promise<void> => {
    const {postIdToComment, token, content} = input

    const postDB: PostDB | undefined = await this.postDatabase.getPostById(postIdToComment)
    if(!postDB){
      throw new NotFoundError("ERROR: 'postIdToComment' not found")
    }

    //login ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    //characters quantity
    if(content.length > 280){
      throw new BadRequestError("ERROR: The maximum post length is 280 characters.")
    }

    const newComment = new Comment(
      this.idGenerator.generate(), 
      payload.id,
      postDB.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    )

    await this.commentDatabase.insertComment(newComment.toDBModel())
    const commentsByPostId = await this.commentDatabase.getCommentsByPostId(postDB.id) 
    await this.commentDatabase.updateQuantityComments(postDB.id, commentsByPostId.length)
  }

  public upvoteOrDownvoteComment = async (input: UpvoteOrDownvoteCommentOutputDTO): Promise<void> => {
    const {idToVote, token, vote} = input

    const commentDB: CommentDB | undefined = await this.commentDatabase.getCommentById(idToVote)
    if(!commentDB){
      throw new NotFoundError("ERROR: 'idToVote' not found")
    }

    //login ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed.")
    }

    const voteDB = vote ? 1 : 0

    const commentUpvoteDownvoteDB : commentUpvoteDownvoteDB = {
      comment_id: commentDB.id,
      user_id: payload.id,
      vote: voteDB
    }

    const comment = new Comment(
      commentDB.id, 
      commentDB.creator_id,
      commentDB.post_id,
      commentDB.content,
      commentDB.upvote,
      commentDB.downvote,
      commentDB.created_at,
      commentDB.updated_at
    )

    const commentUpvoteDownvote = await this.commentDatabase.findCommentUpvoteDownvote(commentUpvoteDownvoteDB)

    //upvote or downvote check 
    if(commentUpvoteDownvote === "up"){ //alreary upvoted
      if(vote){
        await this.commentDatabase.removeUpvoteDownvote(commentUpvoteDownvoteDB)
        comment.removeUpvote()
      }else{
        await this.commentDatabase.updateUpvoteDownvote(commentUpvoteDownvoteDB)
        comment.removeUpvote()
        comment.addDownvote()
      }
    }else if(commentUpvoteDownvote === "down"){ //alreary downvoted
      if(vote){
        await this.commentDatabase.updateUpvoteDownvote(commentUpvoteDownvoteDB)
        comment.removeDownvote()
        comment.addUpvote()
      }else{
        await this.commentDatabase.removeUpvoteDownvote(commentUpvoteDownvoteDB)
        comment.removeDownvote()
      }
    }else{
      await this.commentDatabase.upvoteDownvoteComment(commentUpvoteDownvoteDB)
      voteDB ? comment.addUpvote() : comment.addDownvote()  
    }

    await this.commentDatabase.updateComment(idToVote, comment.toDBModel())
  }


  //=====================================
  //ENDPOINTS NOT USED IN MOBILE VERSION
  //=====================================

  // public editComment = async (input: EditCommentOutputDTO): Promise<void> => {
  //   const {idToEdit, token, content} = input
    
  //   const commentDB: CommentDB | undefined = await this.commentDatabase.getCommentById(idToEdit)
  //   if(!commentDB){
  //     throw new NotFoundError("ERROR: 'idToEdit' not found.")
  //   }

  //   //login ckeck
  //   const payload = this.tokenManager.getPayload(token)
  //   if(payload === null){
  //     throw new BadRequestError("ERROR: Login failed")
  //   }

  //   if(commentDB.creator_id !== payload.id){
  //     throw new ForbiddenError("ERROR: There's no permission to complete the request.")
  //   }

  //   //characters quantity
  //   if(content.length > 300){
  //     throw new BadRequestError("ERROR: The maximum comment length is 300 characters.")
  //   }

  //   const newComment = new Comment(
  //     commentDB.id, 
  //     commentDB.creator_id,
  //     commentDB.post_id,
  //     commentDB.content,
  //     commentDB.upvote,
  //     commentDB.downvote,
  //     commentDB.created_at,
  //     commentDB.updated_at
  //   )

  //   newComment.setContent(content)
  //   newComment.setUpdatedAt(new Date().toISOString())

  //   await this.commentDatabase.updateComment(idToEdit, newComment.toDBModel())
  // }

  public deleteComment = async (input: DeleteCommentOutputDTO): Promise<void> => {
    const {idToDelete, token} = input

    const commentDB: CommentDB | undefined = await this.commentDatabase.getCommentById(idToDelete)
    if(!commentDB){
      throw new NotFoundError("ERROR: 'idToDelete' not found.")
    }

    //login ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed.")
    }

    //permission check
    if(payload.role !== USER_ROLES.ADMIN && commentDB.creator_id !== payload.id){
      throw new ForbiddenError("ERROR: There's no permission to complete the request.")
    }

    await this.commentDatabase.deleteComment(idToDelete)
  }
}