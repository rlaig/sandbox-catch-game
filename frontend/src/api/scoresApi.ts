
import { apiClient } from './apiClient'
import { Score, ScoreSubmitResult, ScorePayload } from '../types/scores'

const getTop100Scores = async (): Promise<Score[]> => {
  const result = await apiClient.get('/scores')
  return result.data?.response
}

const submitScore = async (payload: ScorePayload): Promise<ScoreSubmitResult> => {
  const result = await apiClient.post('/scores/add',{
    ...payload
  })
  return result.data?.results
}

export const scoresApi = {
  getTop100Scores,
  submitScore
}