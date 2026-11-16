
import axios from 'axios'
import type { AppDispatch } from './military_branch_store'

import { loginMilitaryBranch } from '../api/military_branch_auth'
import { militaryBranchSwagger } from '../api/military_branch_swagger'
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../slices/military_branch_user_slice'

export async function authorizeMilitaryBranch(
  dispatch: AppDispatch,
  login: string,
  password: string
): Promise<boolean> {
  dispatch(loginStart())

  try {
   const data = await loginMilitaryBranch(login, password)

localStorage.setItem('military_branch_token', data.token)

militaryBranchSwagger.setSecurityData(data.token)

    dispatch(
      loginSuccess({
        username: data.user.login,
        token: data.token,
      })
    )

    return true
  } catch (error) {
    let message = 'Не удалось выполнить вход'

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        message = 'Неверный логин или пароль'
      } else if (error.response?.status === 500) {
        message = 'Ошибка сервера'
      } else if (!error.response) {
        message = 'Нет соединения с сервером'
      }
    }

    dispatch(loginFailure(message))
    return false
  }
}
