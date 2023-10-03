import { UserBusiness } from '../../src/business/UserBusiness'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { UnprocessableEntity } from '../../src/errors/UnprocessableEntityError'

describe('signup', () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  it('success', async () => {
    const input = {
      nickname: 'test',
      email: 'test@email.com',
      password: 'Test.123'
    }

    const output = await userBusiness.signup(input)
    expect(output).toEqual({token: 'token-mock-normal'})
  })

  it('error test: nickname length', async () => {
    expect.assertions(2)
    try {
      const input = {
        nickname: 'xxx',
        email: 'test@email.com',
        password: 'Test.123'
      }
  
      await userBusiness.signup(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: 'nickname' must be at least 4 characters.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  it('error test: email format', async () => {
    expect.assertions(2)
    try {
      const input = {
        nickname: 'test',
        email: 'xxx',
        password: 'Test.123'
      }
  
      await userBusiness.signup(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: 'email' must be like 'example@example.example'.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  it('error test: password format', async () => {
    expect.assertions(2)
    try {
      const input = {
        nickname: 'test',
        email: 'test@email.com',
        password: 'xxx'
      }
  
      await userBusiness.signup(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  it('error test: nickname repeat', async () => {
    expect.assertions(2)
    try {
      const input = {
        nickname: 'normal.mock',
        email: 'test@email.com',
        password: 'Test.123'
      }
  
      await userBusiness.signup(input)
    } catch (error) {
      if (error instanceof UnprocessableEntity) {
        expect(error.message).toBe("ERROR: 'nickname' already exists.")
        expect(error.statusCode).toBe(422)
      }
    }
  })

  it('error test: email repeat', async () => {
    expect.assertions(2)
    try {
      const input = {
        nickname: 'test',
        email: 'normal@email.com',
        password: 'Test.123'
      }
  
      await userBusiness.signup(input)
    } catch (error) {
      if (error instanceof UnprocessableEntity) {
        expect(error.message).toBe("ERROR: 'email' already exists.")
        expect(error.statusCode).toBe(422)
      }
    }
  })
})