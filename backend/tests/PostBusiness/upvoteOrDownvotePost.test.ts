import { PostBusiness } from '../../src/business/PostBusiness'
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe('upvoteOrDownvotePost', () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
  )

  it('success', async () => {
    const input = {
      idToVote : "id-mock",
      token : "token-mock-normal",
      vote : true
    }

    await postBusiness.upvoteOrDownvotePost(input)
  })

  it('error test: id not found', async () => {
    expect.assertions(2)
    try {
      const input = {
        idToVote : "xxx",
        token : "token-mock-normal",
        vote : true
      }
  
      await postBusiness.upvoteOrDownvotePost(input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("ERROR: 'idToVote' not found")
        expect(error.statusCode).toBe(404)
      }
    }
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
      const input = {
        idToVote : "id-mock",
        token : "xxx",
        vote : true
      }
  
      await postBusiness.upvoteOrDownvotePost(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: Login failed.")
        expect(error.statusCode).toBe(400)
      }
    }
  })
})