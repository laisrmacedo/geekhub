import express from "express"
import { FlagController } from "../controller/FlagController"
import { FlagBusiness } from "../business/FlagBusiness"
import { FlagDatabase } from "../database/FlagDatabase"
import { TokenManager } from "../services/TokenManager"

export const flagRouter = express.Router()

const flagController = new FlagController(
  new FlagBusiness(
    new FlagDatabase(),
    new TokenManager
  )
)
  
flagRouter.get("/", flagController.getFlags)