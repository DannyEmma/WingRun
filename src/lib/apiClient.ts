//-- Use to serve my internal api --
export default async function apiClient<T>(endpoint: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE', data?: T) {
  console.log('data apiClient => ', data)

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  let result = null

  let fetchInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }

  try {
    const response = await fetch(baseURL + endpoint, fetchInit)
    result = await response.json()
  } catch (error) {
    throw error
  } finally {
  }

  return result
}
