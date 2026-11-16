
import { useOutletContext } from 'react-router-dom'
import {
  fetchMilitaryBranches,
  deleteMilitaryBranch,
} from '../slices/military_branches_thunks'
import MilitaryBranchCard from '../components/military_branch_card'
import MilitaryBranchSpeedFilter from '../components/military_branch_speed_filter'
import type { MilitaryBranchOutletContext } from '../military_branch_app_layout'

import {
  useAppDispatch,
  useAppSelector,
} from '../store/military_branch_hooks'

import {
  setMinSpeed,
  setSelectedSpeed,
} from '../slices/military_branches_slice'

function MilitaryBranchTile() {
 const { branches } =
  useOutletContext<MilitaryBranchOutletContext>()

  const dispatch = useAppDispatch()

  const speed = useAppSelector(
    (state) => state.militaryBranches.minSpeed
  )
const loading = useAppSelector(
  (state) => state.militaryBranches.loading
)
  
const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  if (loading) return

  dispatch(setSelectedSpeed(speed))
  dispatch(fetchMilitaryBranches(speed))
}


  const filteredBranches = branches

 const handleDelete = (id: number) => {
  dispatch(deleteMilitaryBranch(id))
}

  return (
    <main className="page">
      <h1>Рода войск</h1>

      <MilitaryBranchSpeedFilter
        speed={speed}
        setSpeed={(value) => dispatch(setMinSpeed(value))}
        onSubmit={handleSearch}
        loading={loading}
      />
        {loading && (
          <p role="status" aria-live="polite">
            Загрузка родов войск...
          </p>
        )}

      <section className="troops">
        {filteredBranches.map((branch) => (
          <MilitaryBranchCard
            key={branch.id}
            branch={branch}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {filteredBranches.length === 0 && (
        <p>Рода войск с такой скоростью не найдены.</p>
      )}
    </main>
  )
}

export default MilitaryBranchTile
