import { UserBusiness } from '../../src/business/UserBusiness'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe('login', () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  it('success', async () => {
    const input = {
      email: 'normal@email.com',
      password: 'password'
    }

    const output = await userBusiness.login(input)
    expect(output).toEqual({token: 'token-mock-normal'})
  })

  it('error test: email not found', async () => {
    expect.assertions(2)
    try {
      const input = {
        email: 'test@email.com',
        password: 'Test.123'
      }
  
      await userBusiness.login(input)
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.message).toBe("ERROR: 'email' or 'password' are wrong.")
        expect(error.statusCode).toBe(404)
      }
    }
  })

  it('error test: wrong password', async () => {
    expect.assertions(2)
    try {
      const input = {
        email: 'normal@email.com',
        password: 'xxx'
      }
  
      await userBusiness.login(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: 'email' or 'password' are wrong.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

})