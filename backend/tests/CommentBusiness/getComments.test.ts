import { CommentBusiness } from '../../src/business/CommentBusiness'
import { CommentDatabaseMock } from '../mocks/CommentDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'

describe('getComments', () => {
  const commentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
  )

  it('success', async () => {
    const input = {
      token : "token-mock-normal"
    }

    await commentBusiness.getComments(input)
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
      const input = {
        token : "xxx"
      }
  
      await commentBusiness.getComments(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: Login failed.")
        expect(error.statusCode).toBe(400)
      }
    }
  })
})  