import { createAsyncThunk } from '@reduxjs/toolkit'

import { militaryBranchSwagger } from '../api/military_branch_swagger'
import { mapMilitaryBranchApi } from '../data/military_branch_api_mapper'
import { militaryBranches } from '../data/military_branches_mock'

import type { MilitaryBranch } from '../types/military_branch'

export const fetchMilitaryBranches = createAsyncThunk<
  MilitaryBranch[],
  number | undefined,
  { rejectValue: string }
>(
  'militaryBranches/fetchMilitaryBranches',
  async (speed, { rejectWithValue, getState }) => {
  try {
    const state = getState() as {
      militaryBranchUser: {
        isAuthenticated: boolean
      }
    }

    if (state.militaryBranchUser.isAuthenticated) {
      const response =
        await militaryBranchSwagger.api.militaryBranchesFeedList()

      return response.data.data
        .filter((branch: { id?: number }) => typeof branch.id === 'number')
        .map((branch: Parameters<typeof mapMilitaryBranchApi>[0]) =>
          mapMilitaryBranchApi(branch)
        )
        .filter(
          (branch: MilitaryBranch) =>
            speed === undefined || branch.speedPlain >= speed
        )
    }

    const response = await militaryBranchSwagger.api.militaryBranchesList(
      speed === undefined ? undefined : { speed }
    )

      return response.data
  .filter((branch) => typeof branch.id === 'number')
  .map((branch) =>
    mapMilitaryBranchApi(branch as Parameters<typeof mapMilitaryBranchApi>[0])
  )
    } catch (error) {
      console.error('Ошибка загрузки родов войск:', error)

      // Резервный режим для просмотра без сервера
     const state = getState() as {
  militaryBranchUser: {
    isAuthenticated: boolean
  }
}

if (!state.militaryBranchUser.isAuthenticated) {
  return militaryBranches.filter(
    (branch) => speed === undefined || branch.speedPlain >= speed
  )
}

      return rejectWithValue('Не удалось загрузить рода войск')
    }
  }
)
export const deleteMilitaryBranch = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'militaryBranches/deleteMilitaryBranch',
  async (id, { rejectWithValue }) => {
    try {
      await militaryBranchSwagger.api.militaryBranchesDelete(id)

      return id
    } catch (error) {
      console.error('Ошибка удаления рода войск:', error)

      return rejectWithValue('Не удалось удалить род войск')
    }
  }
)
export const toggleMilitaryBranchLike = createAsyncThunk<
  { id: number; liked: number },
  { id: number; liked: number },
  { rejectValue: string }
>(
  'militaryBranches/toggleMilitaryBranchLike',
  async ({ id, liked }, { rejectWithValue }) => {
    try {
      const nextLiked = liked === 1 ? 0 : 1

      await militaryBranchSwagger.api.militaryBranchesLikeCreate(
        id,
        nextLiked === 0 ? { like: 0 } : undefined
      )

      return { id, liked: nextLiked }
    } catch (error) {
      console.error('Ошибка изменения лайка:', error)

      return rejectWithValue('Не удалось изменить лайк')
    }
  }
)