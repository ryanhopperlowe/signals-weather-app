import { useAsync } from "../hooks"
import { format } from "date-fns"
import { ApiRoutes } from "../routes"
import { useSignalEffect } from "@preact/signals-react"
import { userZip } from "../signals"

/** Component built using all local state management. Built bare-bones `react-query` clone using signals instead of react state */
export function CurrentWeather() {
  const { data, execute, pending, error } = useAsync(fetchCurrentWeather)

  useSignalEffect(() => {
    if (!userZip.value) return

    execute(userZip.value)
  })

  if (pending) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!data) return <div className="p-6">Invalid Zip Code Provided</div>

  return (
    <div className="p-6 flex flex-col gap-2">
      <h4 className="text-blue-400 text-3xl">
        Current Weather in {data.location.name}, {data.location.region}
        <br />
        <span className="text-blue-300 text-2xl">
          {format(new Date(data.location.localtime), "p")}
        </span>
      </h4>

      <div className="flex gap-2">
        <img
          src={data.current.condition.icon}
          alt="weather icon"
          className="h-10 w-10"
        />
        <p className="self-center">{data.current.condition.text}</p>
        <p className="self-center text-gray-500">
          {data.current.temp_f}°F ({data.current.temp_c}°C)
        </p>
        <p className="self-center text-green-500">
          Feels like {data.current.feelslike_f}°F ({data.current.feelslike_c}
          °C)
        </p>
      </div>

      <p>Humidity: {data.current.humidity}%</p>
      <p>
        Pressure: {data.current.pressure_in} in ({data.current.pressure_mb} mb)
      </p>

      <p className="flex gap-2">
        Wind: {data.current.wind_mph} mph ({data.current.wind_kph} kph)
      </p>
    </div>
  )
}

function fetchCurrentWeather(zip) {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  return fetch(`${ApiRoutes.currentWeather}?q=${zip}&key=${key}`).then((res) =>
    res.json()
  )
}
