import { ApiRoutes } from "../routes"
import { userZip } from "./user"
import { signalAsync } from "./signalAsync"

/**
 * Get the forecast for the user's zip code
 * implemented using only signals and computed values
 * optimized to be used both inside of components and as global state
 */
export const getForecast = signalAsync(() => fetchForecast(userZip.value))

async function fetchForecast(zip) {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const days = 3

  const response = await fetch(
    `${ApiRoutes.forecast}?key=${key}&days=${days}&q=${zip}`
  )

  if (!response.ok) {
    const { error } = await response.json()
    throw new Error(error?.message || "Unable to fetch forecast")
  }

  return await response.json()
}
