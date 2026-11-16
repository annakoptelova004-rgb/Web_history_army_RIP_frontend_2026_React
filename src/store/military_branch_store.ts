
import { configureStore } from '@reduxjs/toolkit'

import militaryBranchesReducer from '../slices/military_branches_slice'
import militaryBranchUserReducer from '../slices/military_branch_user_slice'

export const store = configureStore({
  reducer: {
    militaryBranches: militaryBranchesReducer,
    militaryBranchUser: militaryBranchUserReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
