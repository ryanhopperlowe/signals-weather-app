import { useSignalEffect } from "@preact/signals-react"
import { ApiRoutes } from "../routes"
import { useAsync } from "./useAsync"
import { userZip } from "../signals"

export function useForecast() {
  const getForecast = useAsync(() => fetchForecast(userZip.value))

  useSignalEffect(() => {
    if (!userZip.value) return
    getForecast.execute()
  })

  return getForecast
}

function fetchForecast(zip) {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const days = 3

  return fetch(`${ApiRoutes.forecast}?key=${key}&q=${zip}&days=${days}`).then(
    (res) => res.json()
  )
}
