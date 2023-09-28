import { UserBusinessModel } from "../business/UserBusiness"
import { UserDB } from "../database/UserDatabase"

export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export class User {
  constructor(
    private id: string, 
    private nickname: string,
    private email: string, 
    private password: string,
    private avatar: string,
    private role: USER_ROLES,
    private createdAt: string
  ){}

  public getId():string{
    return this.id
  }

  public getNickname():string{
    return this.nickname
  }
  public setNickname(value: string): void{
    this.nickname = value
  }

  public getEmail():string{
    return this.email
  }
  public setEmail(value: string): void{
    this.email = value
  }

  public getPassword():string{
    return this.password
  }
  public setPassword(value: string): void{
    this.password = value
  }

  public getAvatar():string{
    return this.avatar
  }
  public setAvatar(value: string): void{
    this.avatar = value
  }

  public getRole():USER_ROLES{
    return this.role
  }
  public getCreatedAt():string{
    return this.createdAt
  }

  public toDBModel(): UserDB {
    return {
      id: this.id,
      nickname: this.nickname,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      role: this.role,
      created_at: this.createdAt
    }
  }

  public toBusinessModel(): UserBusinessModel {
    return {
      id: this.id,
      nickname: this.nickname,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      role: this.role,
      createdAt: this.createdAt
    }
  }

}