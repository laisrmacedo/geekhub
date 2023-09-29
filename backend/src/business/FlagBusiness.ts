import { FlagDatabase } from "../database/FlagDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { TokenManager } from "../services/TokenManager"

export class FlagBusiness {
  constructor(
    private flagDatabase : FlagDatabase,
    private tokenManager: TokenManager
  ) { }

  public getFlags = async (token: string, q: string | undefined): Promise<string[]> => {

    //permission check
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed.")
    }

    const flagsDB = await this.flagDatabase.getFlags(q)
    const flags = flagsDB.map((flagDB) => flagDB.flag)
    
    return flags
  }
}