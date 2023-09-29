import { FlagBusiness } from "../business/FlagBusiness";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";

export class FlagController {
  constructor(
    private flagBusiness: FlagBusiness
  ){}

  public getFlags = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string
      const q = req.query.q as string
  
      const output = await this.flagBusiness.getFlags(token, q)
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
}