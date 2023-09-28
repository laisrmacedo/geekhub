import { UserBusiness } from '../../src/business/UserBusiness'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { ForbiddenError } from '../../src/errors/ForbiddenError'

describe('getUsers', () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  it('success', async () => {
    const input = {
      token: 'token-mock-admin',
      q: undefined
    }

    const output = await userBusiness.getUsers(input)
    expect(output).toEqual([
      {
        id: "id-mock",
        nickname: "normal.mock",
        email: "normal@email.com",
        password: "hash-password",
        avatar: "https://mock.photos/",
        role: "NORMAL",
        createdAt: "2023-01-01"
      },
      {
        id: "id-mock",
        nickname: "admin.mock",
        email: "admin@email.com",
        password: "hash-password",
        avatar: "https://mock.photos/",
        role: "ADMIN",
        createdAt: "2023-12-12"
      }
    ])
  })

  it('error test: login failed', async () => {
    expect.assertions(2)
    try {
      const input = {
        token: 'wrong-token',
        q: undefined
      }
  
      await userBusiness.getUsers(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("ERROR: Login failed.")
        expect(error.statusCode).toBe(400)
      }
    }
  })

  it('error test: permission failed', async () => {
    expect.assertions(2)
    try {
      const input = {
        token: 'token-mock-normal',
        q: undefined
      }
  
      await userBusiness.getUsers(input)
    } catch (error) {
      if (error instanceof ForbiddenError) {
        expect(error.message).toBe("ERROR: There's no permission to complete the request.")
        expect(error.statusCode).toBe(403)
      }
    }
  })
})