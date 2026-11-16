
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { useAppSelector } from '../store/military_branch_hooks'
import {
  createMilitaryBranch,
  publishMilitaryBranch,
} from '../api/military_branch_create'

function MilitaryBranchAdd() {
  const [name, setName] = useState('')
  const [draftId, setDraftId] = useState<number | null>(null)

  const [image, setImage] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)

  const [imageUrl, setImageUrl] = useState('/defaults/default_army.png')
  const [videoUrl, setVideoUrl] = useState('/defaults/default_armys.mp4')

  const [description, setDescription] = useState('')
  const [speedPlain, setSpeedPlain] = useState(0)
  const [food, setFood] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const isAuthenticated = useAppSelector(
    state => state.militaryBranchUser.isAuthenticated
  )

  useEffect(() => {
    if (!image) {
      setImageUrl('/defaults/default_army.png')
      return
    }

    const url = URL.createObjectURL(image)
    setImageUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [image])

  useEffect(() => {
    if (!video) {
      setVideoUrl('/defaults/default_armys.mp4')
      return
    }

    const url = URL.createObjectURL(video)
    setVideoUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [video])

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setImage(event.target.files?.[0] ?? null)
  }

  const handleVideoChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setVideo(event.target.files?.[0] ?? null)
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!isAuthenticated) {
      setError('Для добавления необходимо войти в систему')
      return
    }

    if (loading || draftId !== null) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await createMilitaryBranch(name, image, video)
      const id = result?.data?.id

      if (typeof id !== 'number') {
        throw new Error('Сервер не вернул ID черновика')
      }

      setDraftId(id)
      setMessage('Черновик успешно создан')
    } catch (error) {
      console.error('Ошибка создания черновика:', error)
      setError('Не удалось создать черновик')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (draftId === null || loading) return

    if (!isAuthenticated) {
      setError('Для публикации необходимо войти в систему')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      await publishMilitaryBranch(draftId, description, speedPlain, food)
      setMessage('Род войск успешно опубликован')
      setDraftId(null)
      setName('')
      setDescription('')
      setSpeedPlain(0)
      setFood(0)
      setImage(null)
      setVideo(null)
    } catch (error) {
      console.error('Ошибка публикации:', error)
      setError('Не удалось опубликовать род войск')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page military-add-page">
      <h1>Добавление</h1>

      <div className="military-add-media">
        <label className="military-add-preview">
          <img
            src={imageUrl}
            alt="Изображение рода войск"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={draftId !== null}
            hidden
          />
        </label>

        <div className="military-add-preview">
          <video
            src={videoUrl}
            controls
            playsInline
          />

          <label className="military-add-video-upload">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              disabled={draftId !== null}
              hidden
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="military-add-name">
          Название
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            disabled={draftId !== null}
            required
          />
        </label>

        {error && (
          <p role="alert" className="text-danger">
            {error}
          </p>
        )}

        {message && (
          <p role="status">{message}</p>
        )}

        {draftId === null && (
          <div className="military-add-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'ЗАГРУЗКА...' : 'ДАЛЕЕ'}
            </button>
          </div>
        )}
      </form>

      {draftId !== null && (
        <div className="military-publish">
          <label className="military-add-name">
            Описание
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              rows={3}
            />
          </label>

          <label className="military-add-name">
            Скорость на равнине, км/день
            <input
              type="number"
              min="0"
              value={speedPlain}
              onChange={event =>
                setSpeedPlain(Number(event.target.value))
              }
            />
          </label>

          <label className="military-add-name">
            Питание, кг/день
            <input
              type="number"
              min="0"
              value={food}
              onChange={event =>
                setFood(Number(event.target.value))
              }
            />
          </label>

          <div className="military-add-actions">
            <button
              type="button"
              disabled={loading}
              onClick={handlePublish}
            >
              {loading ? 'ЗАГРУЗКА...' : 'ОПУБЛИКОВАТЬ'}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default MilitaryBranchAdd
