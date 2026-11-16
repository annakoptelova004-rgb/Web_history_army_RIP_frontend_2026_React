
import { useNavigate, useParams, useOutletContext } from 'react-router-dom'

import MilitaryBranchFeedInfo from '../components/military_branch_feed_info'
import type { MilitaryBranchOutletContext } from '../military_branch_app_layout'
import {
  useAppDispatch,
  useAppSelector,
} from '../store/military_branch_hooks'

import { toggleMilitaryBranchLike } from '../slices/military_branches_thunks'

function MilitaryBranchLenta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

const isAuthenticated = useAppSelector(
  (state) => state.militaryBranchUser.isAuthenticated
)
  const { branches } = useOutletContext<MilitaryBranchOutletContext>()

  if (branches.length === 0) {
    return <main className="feed">Загрузка данных...</main>
  }

  const currentIndex = branches.findIndex(
    (branch) => branch.id === Number(id),
  )

  const branch = branches[currentIndex >= 0 ? currentIndex : 0]

  const nextBranch = () => {
    const nextIndex =
      ((currentIndex >= 0 ? currentIndex : 0) + 1) % branches.length

    navigate(`/feed/${branches[nextIndex].id}`)
  }
  const handleLike = () => {
  if (!isAuthenticated) {
    navigate('/login')
    return
  }

  dispatch(
    toggleMilitaryBranchLike({
      id: branch.id,
      liked: branch.liked ?? 0,
    })
  )
}
  return (
    <main className="feed">
      <video
        key={branch.id}
        className="feed-video"
        src={branch.video || '/defaults/default_armys.mp4'}
        poster={branch.image || '/defaults/default_army.png'}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="feed-likes">
  <button
    type="button"
    onClick={handleLike}
    aria-label={branch.liked === 1 ? 'Отменить лайк' : 'Поставить лайк'}
    aria-pressed={branch.liked === 1}
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      opacity: branch.liked === 1 ? 1 : 0.5,
    }}
  >
    <img
      src="/military_branch_media/military_branch_like.svg"
      alt=""
    />
  </button>
  <span>{branch.liked === 1 ? '1' : '0'}</span>
</div>

      <button className="next-button" onClick={nextBranch}>
        СЛЕДУЮЩИЙ
        <img
          src="/military_branch_media/military_branch_next_arrow.png"
          alt=""
        />
      </button>

      <MilitaryBranchFeedInfo branch={branch} />
    </main>
  )
}

export default MilitaryBranchLenta
