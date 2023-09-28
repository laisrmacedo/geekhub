import { PostBusinessModel } from "../business/PostBusiness"
import { PostDB } from "../database/PostDatabase"

export class Post {
  constructor(
    private id: string, 
    private creatorId: string,
    private content: string, 
    private upvote: number,
    private downvote: number,
    private comments: number,
    private createdAt: string,
    private updatedAt: string
  ){}

  public getId():string{
    return this.id
  }

  public getCreatorId():string{
    return this.creatorId
  }

  public getContent():string{
    return this.content
  }
  public setContent(value: string): void{
    this.content = value
  }

  public getUpvote():number{
    return this.upvote
  }
  public addUpvote(): void{
    this.upvote += 1
  }
  public removeUpvote(): void{
    this.upvote -= 1
  }

  public getDownvote():number{
    return this.downvote
  }
  public addDownvote(): void{
    this.downvote += 1
  }
  public removeDownvote(): void{
    this.downvote -= 1
  }

  public getComments():number{
    return this.comments
  }
  public setComments(value: number): void{
    this.comments = value
  }
  
  public getCreatedAt():string{
    return this.createdAt
  }

  public getUpdatedAt():string{
    return this.updatedAt
  }
  public setUpdatedAt(value: string): void{
    this.updatedAt = value
  }

  public toDBModel(): PostDB {
    return {
      id: this.id, 
      creator_id: this.creatorId,
      content: this.content, 
      upvote: this.upvote,
      downvote: this.downvote,
      comments: this.comments,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public toBusinessModel(): PostBusinessModel {
    return {
      id: this.id, 
      creatorId: this.creatorId,
      content: this.content, 
      upvote: this.upvote,
      downvote: this.downvote,
      comments: this.comments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

}