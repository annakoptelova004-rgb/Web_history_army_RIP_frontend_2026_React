
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MilitaryBranch } from '../types/military_branch'
import { militaryBranches } from '../data/military_branches_mock'
import {
  fetchMilitaryBranches,
  deleteMilitaryBranch,
  toggleMilitaryBranchLike,
} from './military_branches_thunks'

interface MilitaryBranchesState {
  branches: MilitaryBranch[]
  minSpeed: number
  selectedSpeed: number | null
  loading: boolean
  error: string | null
}

const initialState: MilitaryBranchesState = {
  branches: militaryBranches,
  minSpeed: 1,
  selectedSpeed: null,
  loading: false,
  error: null,
}

const militaryBranchesSlice = createSlice({
  name: 'militaryBranches',
  initialState,
  reducers: {
    setBranches(state, action: PayloadAction<MilitaryBranch[]>) {
      state.branches = action.payload
    },

    setMinSpeed(state, action: PayloadAction<number>) {
      state.minSpeed = action.payload
    },

    setSelectedSpeed(state, action: PayloadAction<number | null>) {
      state.selectedSpeed = action.payload
    },

   
    resetFilters(state) {
      state.minSpeed = 1
      state.selectedSpeed = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMilitaryBranches.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchMilitaryBranches.fulfilled, (state, action) => {
        state.loading = false
        state.branches = action.payload
      })

      .addCase(fetchMilitaryBranches.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload ?? 'Ошибка загрузки родов войск'
      })
      .addCase(deleteMilitaryBranch.fulfilled, (state, action) => {
       state.branches = state.branches.filter(
       (branch) => branch.id !== action.payload
          )
        })
        .addCase(toggleMilitaryBranchLike.fulfilled, (state, action) => {
  const branch = state.branches.find(
    (item) => item.id === action.payload.id
  )

  if (branch) {
    branch.liked = action.payload.liked
  }
})
  },
})


export const {
  setBranches,
  setMinSpeed,
  setSelectedSpeed,
  resetFilters,
} = militaryBranchesSlice.actions

export default militaryBranchesSlice.reducer
