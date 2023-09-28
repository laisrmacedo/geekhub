import { TokenPayload } from "../../src/services/TokenManager"
import { USER_ROLES } from "../../src/models/User"

export class TokenManagerMock {

  public createToken = (payload: TokenPayload): string => {
      if (payload.role == USER_ROLES.NORMAL) {
          return "token-mock-normal"
      } else {
          return "token-mock-admin"
      }
  }

  public getPayload = (token: string): TokenPayload | null => {
      if (token == "token-mock-normal") {
          return {
              id: "id-mock",
              nickname: "Normal Mock",
              role: USER_ROLES.NORMAL
          }

      } else if (token == "token-mock-admin") {
          return {
              id: "id-mock",
              nickname: "Admin Mock",
              role: USER_ROLES.ADMIN
          }

      } else {
          return null
      }
  }
}