import { BaseDatabase } from "../../src/database/BaseDatabase";
import { CommentDB } from "../../src/database/CommentDatabase"
import { UserDB } from "../../src/database/UserDatabase";
import { commentDBMock } from "./CommentDatabaseMock"
import { usersDBMock } from "./UserDatabaseMock";

export interface PostDB {
  id: string,
  creator_id: string,
  content: string,
  upvote: number,
  downvote: number,
  comments: number,
  created_at: string,
  updated_at: string
}

export interface postUpvoteDownvoteDB {
  post_id: string,
  user_id: string,
  vote: number
}

export const postDBMock: PostDB[] = [
  {
    id: "id-mock",
    creator_id: "id-mock",
    content: "post-mock",
    upvote: 10,
    downvote: 10,
    comments: 10,
    created_at: "2023-01-01",
    updated_at: "2023-02-01"
  }
]

const postUpvoteDownvoteDBMock: postUpvoteDownvoteDB[] = [
  {
    post_id: "id-mock-1",
    user_id: "id-mock",
    vote: 1
  },
  {
    post_id: "id-mock-2",
    user_id: "id-mock",
    vote: 0
  }
]


export class PostDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_POST_UPVOTE_DOWNVOTE = "post_upvote_downvote"
  public static TABLE_COMMENTS = "comments"
  public static TABLE_USERS = "users"

  public async getPosts(q: string | undefined): Promise<PostDB[]> {
    let postsDB: PostDB[]
    if (q) {
      postsDB = postDBMock.filter((post) => post.content.includes(q))
    } else {
      postsDB = postDBMock
    }
    return postsDB
  }

  public async insertPost(post: PostDB): Promise<void> {  }
  
  public async getPostById(id: string): Promise<PostDB | undefined> {
    const result: PostDB[] = postDBMock.filter((post) => post.id === id)
    
    return result[0]
  }

  public async getCreator(id: string): Promise<UserDB> {
    const result: UserDB[] = usersDBMock.filter((user) => user.id === id)
    
    return result[0]
  }

  public async getCommentsByPostId(id: string): Promise<CommentDB[]> {
    const result: CommentDB[] = commentDBMock.filter((comment) => comment.post_id === id)

    return result
  }

  public async updatePost(id: string, post: PostDB): Promise<void> {

  }

  public async deletePost(id: string): Promise<void> {

  }

  public async upvoteDownvotePost(item: postUpvoteDownvoteDB): Promise<void>{
    
  }

  public async findPostUpvoteDownvote(item: postUpvoteDownvoteDB): Promise<string | null>{
    const [result]: postUpvoteDownvoteDB[] = postUpvoteDownvoteDBMock.filter((post) => {
      post.post_id === item.post_id && post.user_id === item.user_id})

    if(result){
      return result.vote === 1 ? "up" : "down"
    }else{
      return null
    }
  }

  public async removeUpvoteDownvote(item: postUpvoteDownvoteDB): Promise<void>{
    // await BaseDatabase
    // .connection(PostDatabase.TABLE_POST_UPVOTE_DOWNVOTE)
    // .del()
    // .where({ 
    //   user_id: item.user_id,
    //   post_id: item.post_id
    // })
  }
  
  public async updateUpvoteDownvote(item: postUpvoteDownvoteDB): Promise<void>{
    // await BaseDatabase
    // .connection(PostDatabase.TABLE_POST_UPVOTE_DOWNVOTE)
    // .update(item)
    // .where({ 
    //   user_id: item.user_id,
    //   post_id: item.post_id
    // })
  }

}