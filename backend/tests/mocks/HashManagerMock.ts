export class HashManagerMock {
  public hash = async (plaintext: string): Promise<string> => {
      if (plaintext == "password") {
          return "hash-password"
      }

      return "hash-mock"
  }

  public compare = async (plaintext: string, hash: string): Promise<boolean> => {
      if (plaintext == "password" && hash == "hash-password") {
          return true
      }

      return false
  }
}