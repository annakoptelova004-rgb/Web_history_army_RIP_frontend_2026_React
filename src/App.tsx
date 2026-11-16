
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import MilitaryBranchAppLayout from './military_branch_app_layout'
import MilitaryBranchLenta from './pages/military_branch_lenta'
import MilitaryBranchTile from './pages/military_branch_tile'
import MilitaryBranchLogin from './pages/military_branch_login'
import MilitaryBranchAdd from './pages/military_branch_add'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MilitaryBranchAppLayout />}>
          <Route path="/add" element={<MilitaryBranchAdd />} />
          <Route path="/" element={<Navigate to="/tile" replace />} />
          <Route path="/feed" element={<Navigate to="/feed/1" replace />} />
          <Route path="/feed/:id" element={<MilitaryBranchLenta />} />
          <Route path="/tile" element={<MilitaryBranchTile />} />
          <Route path="/login" element={<MilitaryBranchLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
