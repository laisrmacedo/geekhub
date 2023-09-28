import { BaseDatabase } from "../../src/database/BaseDatabase"
import { commentUpvoteDownvoteDB } from "../../src/database/CommentDatabase"
import { PostDB, postDBMock } from "./PostDatabaseMock"

export interface CommentDB {
  id: string, 
  creator_id: string,
  post_id: string,
  content: string, 
  upvote: number,
  downvote: number,
  created_at: string,
  updated_at: string
}

export const commentDBMock: CommentDB[] = [
  {
    id: "id-mock",
    creator_id: "id-mock",
    post_id: "id-mock",
    content: "comment-mock",
    upvote: 10,
    downvote: 10,
    created_at: "2023-01-01",
    updated_at: "2023-02-01"
  }
]

const commentUpvoteDownvoteDBMock: commentUpvoteDownvoteDB[] = [
  {
    comment_id: "id-mock-1",
    user_id: "id-mock",
    vote: 1
  },
  {
    comment_id: "id-mock-2",
    user_id: "id-mock",
    vote: 0
  }
]

export class CommentDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_COMMENTS = "comments"
  public static TABLE_COMMENT_UPVOTE_DOWNVOTE = "comment_upvote_downvote"

  public async getPostById(id: string): Promise<PostDB | undefined> {
    const result: PostDB[] = postDBMock.filter((post) => post.id === id)
    
    return result[0]
  }

  public async getCommentById(id: string): Promise<CommentDB | undefined> {
    const result: CommentDB[] = commentDBMock.filter((comment) => comment.id === id)  
    
    return result[0]
  }

  public async getComments(): Promise<CommentDB[]>{
    return commentDBMock
  }

  public async insertComment(comment: CommentDB): Promise<void> {

  }

  public async getCommentsByPostId(id: string): Promise<CommentDB[]> {
    const result: CommentDB[] = commentDBMock.filter((comment) => comment.post_id === id)  
    
    return result
  }

  public async updateQuantityComments(postId: string, value: number): Promise<void> {

  }

  public async updateComment(id: string, comment: CommentDB): Promise<void> {

  }

  public async deleteComment(id: string): Promise<void> {

  }

  public async findCommentUpvoteDownvote(item: commentUpvoteDownvoteDB): Promise<string | null>{
    const [result]: commentUpvoteDownvoteDB[] = commentUpvoteDownvoteDBMock.filter((comment) => {
      comment.comment_id === item.comment_id && comment.user_id === item.user_id})

    if(result){
      return result.vote === 1 ? "up" : "down"
    }else{
      return null
    }
  }

  public async removeUpvoteDownvote(item: commentUpvoteDownvoteDB): Promise<void>{

  }
  
  public async updateUpvoteDownvote(item: commentUpvoteDownvoteDB): Promise<void>{

  }

  public async upvoteDownvoteComment(item: commentUpvoteDownvoteDB): Promise<void>{

  }
}