import { CommentBusiness } from '../../src/business/CommentBusiness'
import { CommentDatabaseMock } from '../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe('createComment', () => {
  const commentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
  )

  it('success', async () => {
    const input = {
      postIdToComment : "id-mock",
      token : "token-mock-normal",
      content : "comment-content"
    }

    await commentBusiness.createComment(input)
  })

  it('error test: id not found', async () => {
    expect.assertions(2)
    try {
      const input = {
        postIdToComment : "xxx",
        token : "token-mock-normal",
        content : "comment-content"
      }
  
      await commentBusiness.createComment(input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("ERROR: 'postIdToComment' not found")
        expect(error.statusCode).toBe(404)
      }
    }
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
    const input = {
      postIdToComment : "id-mock",
      token : "xxx",
      content : "comment-content"
    }
  
      await commentBusiness.createComment(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: Login failed")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
    const input = {
      postIdToComment : "id-mock",
      token : "token-mock-normal",
      content : "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    }
  
      await commentBusiness.createComment(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: The maximum post length is 280 characters.")
        expect(error.statusCode).toBe(400)
      }
    }
  })
})  