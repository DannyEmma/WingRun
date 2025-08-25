import { useState } from 'react'

export default function useFetchAPI<T>() {
  type fetchState = {
    data: T | null
    isPending: boolean
    error: string | null
  }

  const [state, setState] = useState<fetchState>({ data: null, isPending: false, error: null })

  const fetchCallback = async (url: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE', data?: T) => {
    setState((prevState) => ({ ...prevState, isPending: true }))

    let fetchInit = {
      body: data ? JSON.stringify(data) : undefined,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, fetchInit)
      const result = await response.json()

      setState({ data: result.data, isPending: false, error: null })
    } catch (error) {
      if (error) {
        console.log(error)

        // setState((prevState) => ({ ...prevState, error.message }))
      }
    }
  }

  return { ...state, fetchCallback }
}
