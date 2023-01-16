
import { apiClient } from './apiClient'
import { Score } from '../types/scores'

type ScorePayload = {
  name: string
  score: number
}

const getTop100Scores = async (): Promise<Score[]> => {
  const result = await apiClient.get('/scores')
  return result.data
}

const submitScore = async (payload: ScorePayload): Promise<Score> => {
  const result = await apiClient.post('/scores/add',{
    ...payload
  })
  return result.data
}

export const scoresApi = {
  getTop100Scores,
  submitScore
}