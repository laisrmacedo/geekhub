import { PostBusiness } from '../../src/business/PostBusiness'
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe('getPostById', () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
  )

  it('success', async () => {
    const input = {
      id : "id-mock",
      token : "token-mock-normal"
    }

    const output = await postBusiness.getPostById(input)
    expect(output).toEqual({
      id: "id-mock",
      creatorNickname: "normal.mock",
      content: "post-mock",
      upvote: 10,
      downvote: 10,
      createdAt: "2023-01-01",
      updatedAt: "2023-02-01",
      comments: [{
        id: "id-mock",
        creatorNickname: "normal.mock",
        content: "comment-mock",
        upvote: 10,
        downvote: 10,
        createdAt: "2023-01-01",
        updatedAt: "2023-02-01"
      }]
    })
  })

  it('error test: id not found', async () => {
    expect.assertions(2)
    try {
      const input = {
        id : "xxx",
        token : "token-mock-normal"
      }
  
      await postBusiness.getPostById(input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("ERROR: 'id' not found.")
        expect(error.statusCode).toBe(404)
      }
    }
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
      const input = {
        id : "id-mock",
        token : "xxx"
      }
  
      await postBusiness.getPostById(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: Login failed.")
        expect(error.statusCode).toBe(400)
      }
    }
  })
})