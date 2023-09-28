import { BadRequestError } from "../errors/BadRequestError"

export interface GetPostsOutputDTO {
  token: string,
  q: string | undefined
}

export interface GetPostByIdOutputDTO {
  id: string,
  token: string
}

export interface CreatePostOutputDTO {
  token: string,
  content: string
}

export interface EditPostOutputDTO {
  idToEdit: string,
  token: string,
  content: string
}

export interface DeletePostOutputDTO {
  idToDelete: string,
  token: string
}

export interface UpvoteOrDownvotePostOutputDTO {
  idToVote: string,
  token: string,
  vote: boolean
}


export class PostDTO {
  public getPostsInputDTO(
    token: string | undefined,
    q: unknown
  ):GetPostsOutputDTO {

    if(!token){
      throw new BadRequestError("ERROR: log in to see the posts.")
    }

    if (q !== undefined && typeof q !== "string") {
      throw new BadRequestError("ERROR: the query must be of type string.")
    }

    const dto: GetPostsOutputDTO = {
      token,
      q
    }
    
    return dto
  }

  public getPostByIdInputDTO(
    id: string,
    token: string | undefined
  ):GetPostByIdOutputDTO {

    if(id === ":id"){
      throw new BadRequestError("ERROR: report the id of the post.")
    }

    if(!token){
      throw new BadRequestError("ERROR: log in to see the posts.")
    }


    const dto: GetPostByIdOutputDTO = {
      id,
      token
    }
    
    return dto
  }

  public createPostInputDTO(
    token: string | undefined,
    content: unknown,
  ): CreatePostOutputDTO{

    if(!token){
      throw new BadRequestError("ERROR: log in to create a posts.")
    }

    if(!content || content === ""){
      throw new BadRequestError("ERROR: content field is mandatory.")
    }
    if (typeof content !== "string") {
      throw new BadRequestError("ERROR: 'content' must be of type string.")
    }

    const dto: CreatePostOutputDTO = {
      token,
      content
    }
    
    return dto
  }

  public editPostInputDTO(
    idToEdit: string,
    token: string | undefined,
    content: unknown,
  ): EditPostOutputDTO{

    if(idToEdit === ":id"){
      throw new BadRequestError("ERROR: report the id of the post to be edited.")
    }

    if(!token){
      throw new BadRequestError("ERROR: log in to create a posts.")
    }

    if(!content || content === ""){
      throw new BadRequestError("ERROR: content field is mandatory.")
    }
    if (typeof content !== "string") {
      throw new BadRequestError("ERROR: 'content' must be of type string.")
    }

    const dto: EditPostOutputDTO = {
      idToEdit,
      token,
      content
    }
    
    return dto
  }

  public deletePostInputDTO(
    idToDelete: string,
    token: string | undefined
  ): DeletePostOutputDTO{

    if(idToDelete === ":id"){
      throw new BadRequestError("ERROR: report the id of the post to be deleted.")
    }

    if(!token){
      throw new BadRequestError("ERROR: log in to edit the post.")
    }
    if (typeof token !== "string") {
      throw new BadRequestError("ERROR: 'token' must be of type string.")
    }

    const dto: DeletePostOutputDTO = {
      idToDelete,
      token
    }

    return dto
  }

  public upvoteOrDownvotePostInputDTO(
    idToVote: string,
    token: string | undefined,
    vote: unknown
  ): UpvoteOrDownvotePostOutputDTO{

    if(idToVote === ":id"){
      throw new BadRequestError("ERROR: report the id of the post to be voted.")
    }

    if(!token){
      throw new BadRequestError("ERROR: log in to vote the post.")
    }

    if(vote === undefined || vote === ""){
      throw new BadRequestError("ERROR: the 'vote' field is mandatory.")
    }
    if (typeof vote !== "boolean") {
      throw new BadRequestError("ERROR: 'vote' must be true or false.")
    }

    const dto: UpvoteOrDownvotePostOutputDTO = {
      idToVote,
      token,
      vote
    }

    return dto
  }
}