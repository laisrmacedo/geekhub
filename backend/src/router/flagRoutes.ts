import express from "express"
import { FlagController } from "../controller/FlagController"
import { FlagBusiness } from "../business/FlagBusiness"
import { FlagDatabase } from "../database/FlagDatabase"
import { TokenManager } from "../services/TokenManager"
import { FlagDTO } from "../dtos/FlagDTO"

export const flagRouter = express.Router()

const flagController = new FlagController(
  new FlagDTO,
  new FlagBusiness(
    new FlagDatabase(),
    new TokenManager
  )
)
  
flagRouter.get("/", flagController.getFlags)
flagRouter.post("/", flagController.addFlag)
flagRouter.delete("/:name", flagController.deleteFlag)