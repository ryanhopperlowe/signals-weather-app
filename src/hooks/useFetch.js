import { useQuery } from "@tanstack/react-query"
import { ApiRoutes } from "../routes"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

/**
 *
 * @param {string} path
 * @param {object} params
 *
 * @returns {object} { data: any, isLoading: boolean, error: any }
 */
export function useFetch(path, params) {
  const res = useQuery({
    queryKey: [path, params],
    queryFn: async ({ queryKey }) => {
      console.log("queryFn", queryKey, ApiRoutes.baseUrl)
      const [path, params] = queryKey

      const searchParams = new URLSearchParams({
        ...params,
        key: API_KEY,
      })

      console.log(searchParams)

      try {
        const url = new URL({
          hostname: ApiRoutes.baseUrl,
          pathname: path,
          searchParams,
        })
        console.log("fetching", url)

        return fetch(url.toString()).then((res) => res.json())
      } catch (error) {
        console.log(error)
      }
    },
  })

  return { data: res.data, isLoading: res.isPending, error: res.error }
}
