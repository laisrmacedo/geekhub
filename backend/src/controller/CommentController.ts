import { Request, Response } from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDTO } from "../dtos/CommentDTO"
import { BaseError } from "../errors/BaseError"

export class CommentController {
  constructor(
    private commentDTO: CommentDTO,
    private commentBusiness: CommentBusiness
  ){}

  public getComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.commentDTO.getCommentsInputDTO(
        req.headers.authorization
      )

      const output = await this.commentBusiness.getComments(input)
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

  public createComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.commentDTO.createCommentInputDTO(
        req.params.id,
        req.headers.authorization,
        req.body.content
      )

      await this.commentBusiness.createComment(input)
      res.status(201).end()
  
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Unexpected error")
      }
    }
  }

  // public editComment = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const input = this.commentDTO.editCommentInputDTO(
  //       req.params.id,
  //       req.headers.authorization,
  //       req.body.content
  //     )

  //     await this.commentBusiness.editComment(input)
  //     res.status(200).end()
  
  //   } catch (error) {
  //     console.log(error)
  //     if (error instanceof BaseError) {
  //       res.status(error.statusCode).send(error.message)
  //     } else {
  //       res.status(500).send("Unexpected error")
  //     }
  //   }
  // }

  public deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.commentDTO.deleteCommentInputDTO(
        req.params.id,
        req.headers.authorization
      )

      await this.commentBusiness.deleteComment(input)
      res.status(200).end()
  
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Unexpected error")
      }
    }
  }

  public upvoteOrDownvoteComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.commentDTO.upvoteOrDownvoteCommentInputDTO(
        req.params.id,
        req.headers.authorization,
        req.body.vote
      )

      await this.commentBusiness.upvoteOrDownvoteComment(input)
      res.status(200).end()
  
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