
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { useAppDispatch, useAppSelector } from '../store/military_branch_hooks'
import { authorizeMilitaryBranch } from '../store/military_branch_auth_actions'

function MilitaryBranchLogin() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loading = useAppSelector(
    state => state.militaryBranchUser.loading
  )

  const error = useAppSelector(
    state => state.militaryBranchUser.error
  )

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const success = await authorizeMilitaryBranch(
      dispatch,
      login,
      password
    )

    if (success) {
      navigate('/tile')
    }
  }

  return (
    <main className="page">
      <h1>Вход</h1>

      <Form className="login-form" onSubmit={handleSubmit}>
       <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={event => setLogin(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        {error && (
          <p role="alert" className="text-danger">
            {error}
          </p>
        )}

       <div className="login-button-wrapper">
  <Button
    type="submit"
    variant="danger"
    className="login-button"
    disabled={loading}
  >
    {loading ? 'ВХОД...' : 'ВОЙТИ'}
  </Button>
</div>
      </Form>
    </main>
  )
}

export default MilitaryBranchLogin
