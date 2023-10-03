import { USER_ROLES } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export interface UserDB {
    id: string,
    nickname: string,
    email: string,
    password: string,
    avatar: string,
    role: USER_ROLES,
    created_at: string
}

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async getUsers(q: string | undefined): Promise<UserDB[]> {
        // await this.createUsersTable()

        let usersDB
        if (q) {
            const result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("nickname", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
            usersDB = result
        }
        return usersDB
    }

    public async findUserById(id: string): Promise<UserDB | undefined> {
        const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return result
    }

    public async findUserByNickname(nickname: string): Promise<UserDB | undefined> {
        const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ nickname })

        return result
    }

    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
        const [result]: UserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ email })

        return result
    }

    public async insertUser(user: UserDB): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(user)
    }

    public async updateUser(id: string, updatedUser: UserDB): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(updatedUser)
            .where({ id })
    }

    public async deleteUser(idToDelete: string): Promise<void> {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .del()
            .where({ id: idToDelete })
    }

}