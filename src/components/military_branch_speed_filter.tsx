
import { Button, Form } from 'react-bootstrap'

interface MilitaryBranchSpeedFilterProps {
  speed: number
  setSpeed: (speed: number) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  loading?: boolean
}

function MilitaryBranchSpeedFilter({
  speed,
  setSpeed,
  onSubmit,
  loading = false,
}: MilitaryBranchSpeedFilterProps) {
  return (
    <Form className="search-form" onSubmit={onSubmit}>
      <Form.Range
        min={1}
        max={10}
        value={speed}
        onChange={(event) => setSpeed(Number(event.target.value))}
      />

      <span className="speed-value">
        Скорость: {speed} км/день
      </span>

      <Button
        type="submit"
        className="search-button"
        disabled={loading}
      >
        {loading ? 'ЗАГРУЗКА...' : 'НАЙТИ'}
      </Button>
    </Form>
  )
}

export default MilitaryBranchSpeedFilter
