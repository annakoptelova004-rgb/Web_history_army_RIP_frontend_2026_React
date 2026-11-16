
import { militaryBranchSwagger } from './military_branch_swagger'

export async function createMilitaryBranch(
  name: string,
  image: File | null,
  video: File | null
) {
  const response =
    await militaryBranchSwagger.api.militaryBranchesCreate({
      name,
      ...(image ? { image } : {}),
      ...(video ? { video } : {}),
    })

  return response.data
}

export async function publishMilitaryBranch(
  id: number,
  description: string,
  speedPlain: number,
  food: number
) {
  const response = await militaryBranchSwagger.api.militaryBranchesUpdate(
    id,
    {
      description,
      speed_plain: speedPlain,
      food
    }
  )

  return response.data
}