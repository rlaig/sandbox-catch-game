
import { apiClient } from './apiClient'
import { Score } from '../types/scores'

const getTop100Scores = async (): Promise<Score[]> => {
  return await apiClient.get('/scores')
}

export const scoresApi = {
  getTop100Scores
}