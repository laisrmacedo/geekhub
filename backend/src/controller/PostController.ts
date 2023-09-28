import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostDTO } from "../dtos/PostDTO";
import { BaseError } from "../errors/BaseError";

export class PostController {
  constructor(
    private postDTO: PostDTO,
    private postBusiness: PostBusiness
  ){}

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string

      const output = await this.postBusiness.getPosts(token)
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

  public getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.postDTO.getPostByIdInputDTO(
        req.params.id,
        req.headers.authorization
      )

      const output = await this.postBusiness.getPostById(input)
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

  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.postDTO.createPostInputDTO(
        req.headers.authorization,
        req.body.content
      )

      await this.postBusiness.createPost(input)
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

  // public editPost = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const input = this.postDTO.editPostInputDTO(
  //       req.params.id,
  //       req.headers.authorization,
  //       req.body.content
  //     )

  //     await this.postBusiness.editPost(input)
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

  public deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.postDTO.deletePostInputDTO(
        req.params.id,
        req.headers.authorization
      )

      await this.postBusiness.deletePost(input)
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
  
  public upvoteOrDownvotePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.postDTO.upvoteOrDownvotePostInputDTO(
        req.params.id,
        req.headers.authorization,
        req.body.vote
      )

      await this.postBusiness.upvoteOrDownvotePost(input)
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