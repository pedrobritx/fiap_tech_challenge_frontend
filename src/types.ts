export type Post = {
  id: string
  title: string
  author: string
  description?: string
  content: string
  createdAt?: string
  updatedAt?: string
}

export type LoginResponse = { token: string }
