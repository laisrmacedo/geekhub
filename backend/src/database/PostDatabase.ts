import { BaseDatabase } from "./BaseDatabase";
import { CommentDatabase, CommentDB, commentUpvoteDownvoteDB } from "./CommentDatabase";
import { UserDB } from "./UserDatabase";

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

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_POST_UPVOTE_DOWNVOTE = "post_upvote_downvote"
  public static TABLE_COMMENTS = "comments"
  public static TABLE_USERS = "users"

  public async getPosts(q: string | undefined): Promise<PostDB[]> {
    let postsDB
    if (q) {
      const result = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where("content", "LIKE", `%${q}%`)
      postsDB = result
    } else {
      const result = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
      postsDB = result
    }
    return postsDB
  }

  public async insertPost(post: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(post)
  }
  
  public async getPostById(id: string): Promise<PostDB | undefined> {
    const result = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .where({ id })
    
    return result[0]
  }

  public async getCreator(id: string): Promise<UserDB> {
    const result: UserDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_USERS)
    .where({ id })
    
    return result[0]
  }

  public async getCommentsByPostId(id: string): Promise<CommentDB[]> {
    const result = await BaseDatabase
    .connection(PostDatabase.TABLE_COMMENTS)
    .where({ post_id: id })
    
    return result
  }

  public async updatePost(id: string, post: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .update(post)
      .where({ id })
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .del()
      .where({ id })
  }

  public async upvoteDownvotePost(item: postUpvoteDownvoteDB): Promise<void>{
    await BaseDatabase
    .connection(PostDatabase.TABLE_POST_UPVOTE_DOWNVOTE)
    .insert(item)
  }

  public async findPostUpvoteDownvote(item: postUpvoteDownvoteDB): Promise<string | null>{
    const [result]: postUpvoteDownvoteDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POST_UPVOTE_DOWNVOTE)
    .select()
    .where({
      post_id: item.post_id,
      user_id: item.user_id
    })

    if(result){
      return result.vote === 1 ? "up" : "down"
    }else{
      return null
    }
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

  public async removeUpvoteDownvote(item: postUpvoteDownvoteDB): Promise<void>{
    await BaseDatabase
    .connection(PostDatabase.TABLE_POST_UPVOTE_DOWNVOTE)
    .del()
    .where({ 
      user_id: item.user_id,
      post_id: item.post_id
    })
  }
  
  public async updateUpvoteDownvote(item: postUpvoteDownvoteDB): Promise<void>{
    await BaseDatabase
    .connection(PostDatabase.TABLE_POST_UPVOTE_DOWNVOTE)
    .update(item)
    .where({ 
      user_id: item.user_id,
      post_id: item.post_id
    })
  }

}