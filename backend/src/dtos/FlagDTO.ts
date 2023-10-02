import { BadRequestError } from "../errors/BadRequestError"

export interface GetFlagsOutputDTO { 
  token: string,
  q: string | undefined
}

export interface AddFlagOutputDTO {
  token: string,
  name: string,
  color: string
}

export interface DeleteFlagOutputDTO {
  nameToDelete: string, 
  token: string
}

export class FlagDTO {
  public getFlagsInputDTO(
    token: string | undefined,
    q: unknown
  ):GetFlagsOutputDTO{
    
    if(!token){
      throw new BadRequestError("ERROR: log in to see the users.")
    }

    if (q !== undefined && typeof q !== "string") {
      throw new BadRequestError("ERROR: the query must be of type string.")
    }

    const dto: GetFlagsOutputDTO = {
      token,
      q
    }

    return dto
  }

  public addFlagInputDTO(
    token: string | undefined,
    name: unknown,
    color: unknown
  ): AddFlagOutputDTO{

    if(!token){
      throw new BadRequestError("ERROR: log in to add a flag.")
    }

    if(!name || name === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof name !== "string") {
      throw new BadRequestError("ERROR: 'name' must be of type string.")
    }

    if(!color || color === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof color !== "string") {
      throw new BadRequestError("ERROR: 'color' must be of type string.")
    }

    const dto: AddFlagOutputDTO = {
      token,
      name,
      color
    }

    return dto
  }

  public deleteFlagInput(
    nameToDelete: string, 
    token: string | undefined
    ): DeleteFlagOutputDTO{

    if(nameToDelete === ":id"){
      throw new BadRequestError("ERROR: report the id of the user to be deleted")
    }
    
    if(!token){
      throw new BadRequestError("ERROR: log in to delete the user.")
    }
    
    const dto: DeleteFlagOutputDTO = {
      nameToDelete,
      token
    }

    return dto
  }
}
