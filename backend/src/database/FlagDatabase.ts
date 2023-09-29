import { BaseDatabase } from "./BaseDatabase";

export class FlagDatabase extends BaseDatabase {
  public static TABLE_FLAGS = "flags"

  public async getFlags(q: string | undefined) {
    let flagsDB
    if (q) {
      const result = await BaseDatabase
        .connection(FlagDatabase.TABLE_FLAGS)
        .where("content", "LIKE", `%${q}%`)
      flagsDB = result
    } else {
      const result = await BaseDatabase
        .connection(FlagDatabase.TABLE_FLAGS)
      flagsDB = result
    }
    return flagsDB
  }
}