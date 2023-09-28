import { PostBusiness } from '../../src/business/PostBusiness'
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe('createPost', () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new TokenManagerMock(),
    new IdGeneratorMock()
  )

  it('success', async () => {
    const input = {
      token : "token-mock-normal",
      content : "content-test"
    }

    await postBusiness.createPost(input)
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
      const input = {
        token : "xxx",
        content : "content-test"
      }
  
      await postBusiness.createPost(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: Login failed.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  it('error test: max content length', async () => {
    expect.assertions(2)
    try {
      const input = {
        token : "token-mock-normal",
        content : "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      }
  
      await postBusiness.createPost(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: The maximum post length is 280 characters.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  
})