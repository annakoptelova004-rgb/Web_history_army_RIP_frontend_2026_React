
import { Api } from './Api'

export const militaryBranchSwagger = new Api<string>({
  baseURL: '',

  securityWorker: (token) => {
    if (!token) {
      return {}
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  },
})
