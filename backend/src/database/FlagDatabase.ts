import { BaseDatabase } from "./BaseDatabase";

export interface Flag {
  name: string,
  color: string
}

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

  public async findFlagByName(name: string): Promise<Flag | undefined> {
    const [result]: Flag[] = await BaseDatabase
        .connection(FlagDatabase.TABLE_FLAGS)
        .where({ name })

    return result
  }

  public async insertFlag(flag: Flag): Promise<void> {
    await BaseDatabase
      .connection(FlagDatabase.TABLE_FLAGS)
      .insert(flag)
  }

  public async deleteUser(nameToDelete: string): Promise<void> {
    await BaseDatabase
      .connection(FlagDatabase.TABLE_FLAGS)
      .del()
      .where({ name: nameToDelete })
  }
}