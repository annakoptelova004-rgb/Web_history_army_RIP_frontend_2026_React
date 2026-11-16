
import { militaryBranchAxios } from './military_branch_axios'

interface LoginResponse {
  status: string
  data: {
    token: string
    user: {
      id: number
      login: string
    }
  }
}

export async function loginMilitaryBranch(
  login: string,
  password: string
) {
  const response = await militaryBranchAxios.post<LoginResponse>(
    '/login',
    {
      login,
      password,
    }
  )

  return response.data.data
}
