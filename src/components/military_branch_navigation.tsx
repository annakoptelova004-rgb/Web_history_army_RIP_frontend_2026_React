
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../store/military_branch_hooks'
import { logout } from '../slices/military_branch_user_slice'
import { resetFilters } from '../slices/military_branches_slice'
import { militaryBranchSwagger } from '../api/military_branch_swagger'

function MilitaryBranchNavigation() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useAppSelector(
    state => state.militaryBranchUser.isAuthenticated
  )

 const handleLogout = () => {
  localStorage.removeItem('military_branch_token')

  militaryBranchSwagger.setSecurityData(null)

  dispatch(logout())
  dispatch(resetFilters())

  navigate('/tile')
}

  return (
    <nav className="bottom-nav">
      <NavLink to="/feed/1">ЛЕНТА</NavLink>

      <NavLink to="/add">ДОБАВЛЕНИЕ</NavLink>

      <NavLink to="/tile">ПЛИТКА</NavLink>

      {isAuthenticated ? (
  <button
    type="button"
    className="nav-logout"
    onClick={handleLogout}
  >
    ВЫЙТИ
  </button>
) : (
  <NavLink to="/login">ВХОД</NavLink>
)}
    </nav>
  )
}

export default MilitaryBranchNavigation
