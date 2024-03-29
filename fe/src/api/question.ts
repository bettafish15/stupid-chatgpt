import { api } from 'api'

export const postQuestion = async (messageObject: { message: string }) => {
  const { data: conversations } = await api.post<{ id: number; message: string }[]>('questions', messageObject, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return conversations
}

export const getQuestions = async () => {
  const { data: conversations } = await api.get<{ id: number; message: string }[]>('questions')

  return conversations
}
