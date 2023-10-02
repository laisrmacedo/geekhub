import { FlagBusiness } from "../business/FlagBusiness";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { FlagDTO } from "../dtos/FlagDTO";

export class FlagController {
  constructor(
    private flagDTO : FlagDTO,
    private flagBusiness: FlagBusiness
  ){}

  public getFlags = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.flagDTO.getFlagsInputDTO(
        req.headers.authorization,
        req.query.q
      )
  
      const output = await this.flagBusiness.getFlags(input)
      res.status(200).send(output)
  
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Unexpected error")
      }
    }
  }

  public addFlag = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.flagDTO.addFlagInputDTO(
        req.headers.authorization,
        req.body.name,
        req.body.color
      )

      const output = await this.flagBusiness.addFlag(input)
      res.status(201).send()

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Unexpected error")
      }
    }
  }

  public deleteFlag = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.flagDTO.deleteFlagInput(
        req.params.name,
        req.headers.authorization
      )

      await this.flagBusiness.deleteFlag(input)
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