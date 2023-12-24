import { useForecast } from "../hooks/forecast"

export function Forecast() {
  const forecast = useForecast()

  if (forecast.pending) return <div>Loading...</div>
  if (forecast.error) return <div>{forecast.error.message}</div>
  if (!forecast.data)
    return <div className="p-6">Invalid Zip Code Provided</div>

  return (
    <div className="p-6">
      <h1>Forecast for the next 3 days</h1>
    </div>
  )
}
