import { USER_ROLES } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export interface UserDB {
  id: string,
  nickname: string,
  email: string,
  password: string,
  avatar: string,
  role: USER_ROLES,
  created_at: string
}

export const usersDBMock: UserDB[] = [
  {
    id: "id-mock",
    nickname: "normal.mock",
    email: "normal@email.com",
    password: "hash-password",
    avatar: "https://mock.photos/",
    role: USER_ROLES.NORMAL,
    created_at: "2023-01-01"
  },
  {
    id: "id-mock",
    nickname: "admin.mock",
    email: "admin@email.com",
    password: "hash-password",
    avatar: "https://mock.photos/",
    role: USER_ROLES.ADMIN,
    created_at: "2023-12-12"
  }
]

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users"

  public async getUsers(q: string | undefined): Promise<UserDB[]> {
    let usersDB: UserDB[]
    if (q) {
      usersDB = usersDBMock.filter((user) => user.nickname.includes(q))
    } else {
      usersDB = usersDBMock
    }
    return usersDB
  }

  public async findUserById(id: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = usersDBMock.filter((user) => user.id === id)

    return result
  }

  public async findUserByNickname(nickname: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = usersDBMock.filter((user) => user.nickname === nickname)

    return result
  }

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const [result]: UserDB[] = usersDBMock.filter((user) => user.email === email)

    return result
  }

  public async insertUser(user: UserDB): Promise<void> { }

  public async updateUser(id: string, updatedUser: UserDB): Promise<void> {
    // await BaseDatabase
    //     .connection(UserDatabase.TABLE_USERS)
    //     .update(updatedUser)
    //     .where({ id })
  }

  public async deleteUser(idToDelete: string): Promise<void> {
    // await BaseDatabase
    //     .connection(UserDatabase.TABLE_USERS)
    //     .del()
    //     .where({ id: idToDelete })
  }
}