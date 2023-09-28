import { BadRequestError } from "../errors/BadRequestError"

export interface GetUsersOutputDTO { 
  token: string,
  q: string | undefined
}

export interface SignupOutputDTO {
  nickname: string,
  email: string,
  password: string
}

export interface LoginOutputDTO {
  email: string,
  password: string
}

export interface EditUserOutputDTO {
  idToEdit: string,
  token: string,
  nickname: string | undefined,
  email: string | undefined,
  password: string | undefined,
  avatar: string | undefined
}

export interface DeleteUserOutputDTO {
  idToDelete: string, 
  token: string
}

export class UserDTO {
  public getUsersInputDTO(
    token: string | undefined,
    q: unknown
  ):GetUsersOutputDTO{
    
    if(!token){
      throw new BadRequestError("ERROR: log in to see the users.")
    }

    if (q !== undefined && typeof q !== "string") {
      throw new BadRequestError("ERROR: the query must be of type string.")
    }

    const dto: GetUsersOutputDTO = {
      token,
      q
    }

    return dto
  }

  public signupInputDTO(
    nickname: unknown,
    email: unknown,
    password: unknown
  ): SignupOutputDTO{

    if (!nickname ||  nickname === "") {
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof nickname !== "string") {
      throw new BadRequestError("ERROR: 'nickname' must be of type string.")
    }

    if(!email || email === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof email !== "string") {
      throw new BadRequestError("ERROR: 'email' must be of type string.")
    }

    if(!password || password === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof password !== "string") {
      throw new BadRequestError("ERROR: 'password' must be of type string.")
    }

    const dto: SignupOutputDTO = {
      nickname,
      email,
      password
    }

    return dto
  }

  public loginInputDTO(
    email: unknown,
    password: unknown
  ): LoginOutputDTO{

    if(!email || email === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof email !== "string") {
      throw new BadRequestError("ERROR: 'email' must be of type string.")
    }

    if(!password || password === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof password !== "string") {
      throw new BadRequestError("ERROR: 'password' must be of type string.")
    }

    const dto: LoginOutputDTO = {
      email,
      password
    }

    return dto
  }

  public editUserInputDTO(
    idToEdit: string,
    token: string | undefined,
    nickname: unknown,
    email: unknown,
    password: unknown,
    avatar: unknown
  ): EditUserOutputDTO{

    if(idToEdit === ":id"){
      throw new BadRequestError("ERROR: report the id of the user to be edited.")
    }

    if(!token){
      throw new BadRequestError("ERROR: log in to edit the user.")
    }

    if (nickname !== undefined && typeof nickname !== "string") {
      throw new BadRequestError("ERROR: 'nickname' must be of type string.")
    }

    if (email !== undefined && typeof email !== "string") {
      throw new BadRequestError("ERROR: 'email' must be of type string.")
    }

    if (password !== undefined && typeof password !== "string") {
      throw new BadRequestError("ERROR: 'password' must be of type string.")
    }

    if (avatar !== undefined && typeof avatar !== "string") {
      throw new BadRequestError("ERROR: 'avatar' must be of type string.")
    }

    const dto: EditUserOutputDTO = {
      idToEdit,
      token,
      nickname,
      email,
      password,
      avatar
    }

    return dto
  }

  public deleteUserInput(
    idToDelete: string, 
    token: string | undefined
    ): DeleteUserOutputDTO{

    if(idToDelete === ":id"){
      throw new BadRequestError("ERROR: report the id of the user to be deleted")
    }
    
    if(!token){
      throw new BadRequestError("ERROR: log in to delete the user.")
    }
    
    const dto: DeleteUserOutputDTO = {
      idToDelete,
      token
    }

    return dto
  }
}
