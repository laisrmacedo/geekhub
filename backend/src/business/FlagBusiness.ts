import { FlagDatabase } from "../database/FlagDatabase"
import { AddFlagOutputDTO, DeleteFlagOutputDTO, GetFlagsOutputDTO } from "../dtos/FlagDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { ForbiddenError } from "../errors/ForbiddenError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnprocessableEntity } from "../errors/UnprocessableEntityError"
import { USER_ROLES } from "../models/User"
import { TokenManager } from "../services/TokenManager"

export class FlagBusiness {
  constructor(
    private flagDatabase : FlagDatabase,
    private tokenManager: TokenManager
  ) { }

  public getFlags = async (input: GetFlagsOutputDTO): Promise<string[]> => {
    const { token, q } = input

    //permission check
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    const flagsDB = await this.flagDatabase.getFlags(q)
    const flags = flagsDB.map((flagDB) => flagDB)
    
    return flags
  }

  public addFlag = async (input: AddFlagOutputDTO): Promise<void> => {
    const { token, name, color } = input

    //login ckeck
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    //permission check
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new ForbiddenError("ERROR: There's no permission to complete the request.")
    }

    //name repeat check
    const foundName = await this.flagDatabase.findFlagByName(name)
    if (foundName) {
        throw new UnprocessableEntity("ERROR: 'name' already exists.")
    }

    //signup
    const flagInstance = {
      name,
      color
    }

    await this.flagDatabase.insertFlag(flagInstance)
  }

  public deleteFlag = async (input: DeleteFlagOutputDTO): Promise<void> => {
    const { nameToDelete, token } = input

    const foundFlagName = await this.flagDatabase.findFlagByName(nameToDelete)
    if (!foundFlagName) {
        throw new NotFoundError("ERROR: 'name' not found.")
    }

    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
        throw new BadRequestError("ERROR: Login failed.")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
        throw new ForbiddenError("ERROR: There's no permission to complete the request.")
    }

    await this.flagDatabase.deleteUser(nameToDelete)
}
}