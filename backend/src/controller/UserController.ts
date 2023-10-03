import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDTO } from "../dtos/UserDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
  constructor(
    private userDTO: UserDTO,
    private userBusiness: UserBusiness
  ) { }

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.getUsersInputDTO(
        req.headers.authorization,
        req.query.q
      )

      const output = await this.userBusiness.getUsers(input)
      res.status(200).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }

  public signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.signupInputDTO(
        req.body.nickname,
        req.body.email,
        req.body.password,
      )

      const output = await this.userBusiness.signup(input)
      res.status(201).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.loginInputDTO(
        req.body.email,
        req.body.password,
      )

      const output = await this.userBusiness.login(input)
      res.status(200).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.getUsersInputDTO(
        req.headers.authorization,
        req.query.q
      )

      const output = await this.userBusiness.getUserById(input)
      res.status(200).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }

  //=====================================
  //ENDPOINTS NOT USED IN MOBILE VERSION
  //=====================================

  public editUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.editUserInputDTO(
        req.params.id,
        req.headers.authorization,
        req.body.nickname,
        req.body.email,
        req.body.password,
        req.body.avatar
      )

      await this.userBusiness.editUser(input)
      res.status(200).end()

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.deleteUserInput(
        req.params.id,
        req.headers.authorization
      )

      await this.userBusiness.deleteUser(input)
      res.status(200).end()

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }
}