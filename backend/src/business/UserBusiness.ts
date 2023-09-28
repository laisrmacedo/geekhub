import { UserDatabase, UserDB } from "../database/UserDatabase"
import { DeleteUserOutputDTO, EditUserOutputDTO, GetUsersOutputDTO, LoginOutputDTO, SignupOutputDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnprocessableEntity } from "../errors/UnprocessableEntityError";
import { User, USER_ROLES } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";

export interface UserBusinessModel {
    id: string,
    nickname: string,
    email: string,
    password: string,
    avatar: string,
    role: USER_ROLES,
    createdAt: string
}

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public getUsers = async (input: GetUsersOutputDTO): Promise<UserBusinessModel[]> => {
        const { token, q } = input

        //permission check
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("ERROR: Login failed.")
        }
        if (payload.role !== USER_ROLES.ADMIN) {
            throw new ForbiddenError("ERROR: There's no permission to complete the request.")
        }

        const usersDB: UserDB[] = await this.userDatabase.getUsers(q)
        const users = usersDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password,
                userDB.avatar,
                userDB.role,
                userDB.created_at
            )
            return user.toBusinessModel()
        })

        return users
    }

    public signup = async (input: SignupOutputDTO): Promise<{}> => {
        const { nickname, email, password } = input

        //syntax checking
        if (nickname.length < 4) {
            throw new BadRequestError("ERROR: 'nickname' must be at least 4 characters.")
        }
        if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError("ERROR: 'email' must be like 'example@example.example'.")
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new BadRequestError("ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character.")
        }

        //nickname repeat check
        const foundNickname = await this.userDatabase.findUserByNickname(nickname)
        if (foundNickname) {
            throw new UnprocessableEntity("ERROR: 'nickname' already exists.")
        }

        //email repeat check
        const foundEmail = await this.userDatabase.findUserByEmail(email)
        if (foundEmail) {
            throw new UnprocessableEntity("ERROR: 'email' already exists.")
        }

        //signup
        const userInstance = new User(
            this.idGenerator.generate(),
            nickname,
            email,
            await this.hashManager.hash(password),
            "https://icon-library.com/images/generic-profile-icon/generic-profile-icon-8.jpg",
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        // "https://picsum.photos/id/659/200/200",
        await this.userDatabase.insertUser(userInstance.toDBModel())

        const tokenPayload: TokenPayload = {
            id: userInstance.getId(),
            nickname: userInstance.getNickname(),
            role: userInstance.getRole()
        }

        const output = {
            token: this.tokenManager.createToken(tokenPayload)
        }

        return output
    }

    public login = async (input: LoginOutputDTO): Promise<{}> => {
        const { email, password } = input

        const userDB: UserDB | undefined = await this.userDatabase.findUserByEmail(email)
        if (!userDB) {
            throw new NotFoundError("ERROR: 'email' or 'password' are wrong.")
        }

        const passwordHash = await this.hashManager.compare(password, userDB.password)
        if (!passwordHash) {
            throw new BadRequestError("ERROR: 'email' or 'password' are wrong.")
        }


        const tokenPayload: TokenPayload = {
            id: userDB.id,
            nickname: userDB.nickname,
            role: userDB.role
        }

        const output = {
            token: this.tokenManager.createToken(tokenPayload)
        }

        return output
    }

    public getUserById = async (input: GetUsersOutputDTO): Promise<UserBusinessModel | undefined> => {
        const { token } = input

        //permission check
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("ERROR: Login failed.")
        }

        const foundUser : UserDB  | undefined = await this.userDatabase.findUserById(payload.id)
        if(foundUser){
            const user = new User(
                foundUser.id,
                foundUser.nickname,
                foundUser.email,
                foundUser.password,
                foundUser.avatar,
                foundUser.role,
                foundUser.created_at
            )
            return user.toBusinessModel()
        }
    }

    //=====================================
    //ENDPOINTS NOT USED IN MOBILE VERSION
    //=====================================

    public editUser = async (input: EditUserOutputDTO): Promise<void> => {
        const { idToEdit, token, nickname, email, password, avatar } = input

        const foundUser = await this.userDatabase.findUserById(idToEdit)
        if(!foundUser){
            throw new NotFoundError("ERROR: 'idToEdit' not found.")
        }

        //permission check
        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("ERROR: Login failed.")
        }

        if (foundUser.id !== payload.id) {
            throw new ForbiddenError("ERROR: There's no permission to complete the request.")
        }

        //syntax checking
        if (nickname && nickname.length < 4) {
            throw new BadRequestError("ERROR: 'nickname' must be at least 4 characters.")
        }
        if (email && !email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError("ERROR: 'email' must be like 'example@example.example'.")
        }
        if (password && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new BadRequestError("ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character.")
        }
        if (avatar && !avatar.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm)) {
            throw new BadRequestError("ERROR: 'avatar' must be a valid image URL.")
        }

        const userInstance = new User(
            foundUser.id,
            foundUser.nickname,
            foundUser.email,
            foundUser.password,
            foundUser.avatar,
            foundUser.role,
            foundUser.created_at
        )

        //nickname repeat check
        if (nickname && nickname !== foundUser.nickname) {
            const foundNickname = await this.userDatabase.findUserByNickname(nickname)
            if(foundNickname){
                throw new UnprocessableEntity("ERROR: 'nickname' already exists.")
            }
            userInstance.setNickname(nickname)
        }

        //email repeat check
        if(email && email !== foundUser.email){
            const foundEmail = await this.userDatabase.findUserByEmail(email)
            if (foundEmail) {
                throw new UnprocessableEntity("ERROR: 'email' already exists.")
            }
            userInstance.setEmail(email)
        }

        if(password){
            userInstance.setPassword(await this.hashManager.hash(password))
        }

        if(avatar){
            userInstance.setAvatar(avatar)
        }

        const newUser: UserDB = {
            id: userInstance.getId(), 
            nickname: userInstance.getNickname(),
            email: userInstance.getEmail(), 
            password: userInstance.getPassword(),
            avatar: userInstance.getAvatar(),
            role: userInstance.getRole(),
            created_at: userInstance.getCreatedAt()
        }

        await this.userDatabase.updateUser(idToEdit, newUser)
    }

    public deleteUser = async (input: DeleteUserOutputDTO): Promise<void> => {
        const { idToDelete, token } = input

        const foundUser = await this.userDatabase.findUserById(idToDelete)
        if (!foundUser) {
            throw new NotFoundError("ERROR: 'id' not found.")
        }

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("ERROR: Login failed.")
        }

        if (payload.role !== USER_ROLES.ADMIN && foundUser.id !== payload.id) {
            throw new ForbiddenError("ERROR: There's no permission to complete the request.")
        }

        await this.userDatabase.deleteUser(idToDelete)
    }
}