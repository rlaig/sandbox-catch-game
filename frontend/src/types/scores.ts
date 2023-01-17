export type Score = {
  id: string
  name: string
  score: number
}

export type ScoreSubmitResult = {
  "deleted": number
  "errors": number
  "generated_keys": string[]
  "inserted": number
  "replaced": number
  "skipped": number
  "unchanged": number
}

