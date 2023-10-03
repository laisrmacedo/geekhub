import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase, PostDB } from "./PostDatabase";

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

export interface commentUpvoteDownvoteDB {
  comment_id: string,
  user_id: string,
  vote: number
}

export class CommentDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_COMMENTS = "comments"
  public static TABLE_COMMENT_UPVOTE_DOWNVOTE = "comment_upvote_downvote"

  public async getPostById(id: string): Promise<PostDB | undefined> {
    const result = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .where({ id })
    
    return result[0]
  }

  public async getCommentById(id: string): Promise<CommentDB | undefined> {
    const result = await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENTS)
    .where({ id })
    
    return result[0]
  }

  public async getComments(): Promise<CommentDB[]>{
    const result = await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENTS)
    .select()
    
    return result
  }

  public async insertComment(comment: CommentDB): Promise<void> {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .insert(comment)
  }

  public async getCommentsByPostId(id: string): Promise<CommentDB[]> {
    const result: CommentDB[] = await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENTS)
    .where({post_id: id})
    
    return result
  }

  public async updateQuantityComments(postId: string, value: number): Promise<void> {
    await BaseDatabase
    .connection(CommentDatabase.TABLE_POSTS)
    .update({ comments: value})
    .where({ id: postId})
  }

  public async updateComment(id: string, comment: CommentDB): Promise<void> {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .update(comment)
      .where({ id })
  }

  public async deleteComment(id: string): Promise<void> {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .del()
      .where({ id })
  }

  public async findCommentUpvoteDownvote(item: commentUpvoteDownvoteDB): Promise<string | null>{
    const [result]: commentUpvoteDownvoteDB[] = await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENT_UPVOTE_DOWNVOTE)
    .select()
    .where({
      comment_id: item.comment_id,
      user_id: item.user_id
    })

    if(result){
      return result.vote === 1 ? "up" : "down"
    }else{
      return null
    }
  }

  public async removeUpvoteDownvote(item: commentUpvoteDownvoteDB): Promise<void>{
    await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENT_UPVOTE_DOWNVOTE)
    .del()
    .where({ 
      comment_id: item.comment_id,
      user_id: item.user_id
    })
  }
  
  public async updateUpvoteDownvote(item: commentUpvoteDownvoteDB): Promise<void>{
    await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENT_UPVOTE_DOWNVOTE)
    .update(item)
    .where({ 
      comment_id: item.comment_id,
      user_id: item.user_id
    })
  }

  public async upvoteDownvoteComment(item: commentUpvoteDownvoteDB): Promise<void>{
    await BaseDatabase
    .connection(CommentDatabase.TABLE_COMMENT_UPVOTE_DOWNVOTE)
    .insert(item)
  }
}