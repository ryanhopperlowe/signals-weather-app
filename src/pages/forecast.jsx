import { format } from "date-fns"
import { useForecast } from "../hooks/useForecast"
import { Fragment } from "react"

export function Forecast() {
  const { data, error, pending } = useForecast()

  if (pending) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (!data)
    return <div className="p-6">No data to show for the current zipcode</div>

  return (
    <div className="p-6 flex flex-col gap-5">
      <h4 className="text-blue-400 text-3xl">
        Forecast for the next 3 days in{" "}
        <span className="text-blue-600">
          {data.location.name}, {data.location.region}
        </span>
      </h4>

      <div className="flex flex-col gap-5">
        {data.forecast.forecastday.map((day) => (
          <div key={day.date}>
            <h5 className="text-blue-400 text-2xl">
              {format(day.date, "EEEE, MMM dd")}{" "}
              <span className="text-blue-300">({day.day.condition.text})</span>
            </h5>

            <div className="flex gap-2">
              <img
                src={day.day.condition.icon}
                alt="weather icon"
                className="h-10 w-10"
              />
              <p className="self-center">{day.day.condition.text}</p>
              <p className="self-center text-gray-500">
                {day.day.maxtemp_f}°F - {day.day.mintemp_f}°F (
                {day.day.maxtemp_f}°C - {day.day.mintemp_c}°C)
              </p>
            </div>

            <p>Humidity: {day.day.avghumidity}%</p>
            <p>
              Pressure: {day.day.avgvis_in} in ({day.day.avgvis_km} km)
            </p>

            <p className="flex gap-2">
              Wind: {day.day.maxwind_mph} mph ({day.day.maxwind_kph} kph)
            </p>

            <h4 className="text-xl text-blue-300 pt-4">
              Hourly Forecast for {format(day.date, "EEEE, MMM dd")}
            </h4>

            <div className="grid grid-cols-4">
              {day.hour.map((hour) => (
                <Fragment key={hour.time}>
                  <p className="self-center text-blue-400">
                    {format(hour.time, "p")}
                  </p>
                  <img
                    src={hour.condition.icon}
                    alt="weather icon"
                    className="h-10 w-10"
                  />
                  <p className="self-center">{hour.condition.text}</p>
                  <p className="self-center text-gray-500">
                    {hour.temp_f}°F ({hour.temp_c}°C)
                  </p>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
