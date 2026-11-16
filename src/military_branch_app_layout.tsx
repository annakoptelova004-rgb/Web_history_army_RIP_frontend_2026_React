
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'

import MilitaryBranchNavigation from './components/military_branch_navigation'

import type { MilitaryBranch } from './types/military_branch'

import {
  useAppDispatch,
  useAppSelector,
} from './store/military_branch_hooks'

import { fetchMilitaryBranches } from './slices/military_branches_thunks'
import { setBranches } from './slices/military_branches_slice'

export interface MilitaryBranchOutletContext {
  branches: MilitaryBranch[]
  setBranches: Dispatch<SetStateAction<MilitaryBranch[]>>
}

function MilitaryBranchAppLayout() {
  const dispatch = useAppDispatch()

const username = useAppSelector(
  state => state.militaryBranchUser.username
)
const isAuthenticated = useAppSelector(
  state => state.militaryBranchUser.isAuthenticated
)

  const branches = useAppSelector(
    (state) => state.militaryBranches.branches
  )

  const loading = useAppSelector(
    (state) => state.militaryBranches.loading
  )

 useEffect(() => {
  dispatch(fetchMilitaryBranches())
}, [dispatch, isAuthenticated])

  const updateBranches: Dispatch<SetStateAction<MilitaryBranch[]>> = (
    value
  ) => {
    const nextBranches =
      typeof value === 'function'
        ? value(branches)
        : value

    dispatch(setBranches(nextBranches))
  }

  return (
    <div className="phone">
      {username && (
  <div className="user-info">
    {username}
  </div>
)}
      {loading && (
        <div role="status">
          Загрузка родов войск...
        </div>
      )}

      <Outlet
        context={{
          branches,
          setBranches: updateBranches,
        }}
      />

      <MilitaryBranchNavigation />
    </div>
  )
}

export default MilitaryBranchAppLayout
