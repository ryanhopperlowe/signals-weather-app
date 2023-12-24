import classNames from "classnames"
import { userZip } from "../signals"
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react"
import { Link } from "react-router-dom"

const zipRegex = /^\d{5}$/

export function AppNav() {
  const input = useSignal(userZip.value)

  const isValid = useComputed(() => zipRegex.test(input.value))

  useSignalEffect(() => {
    if (!isValid.value || userZip.value === input.value) return

    userZip.value = input.value
  })

  const linkClass = "hover:text-white hover:underline"

  return (
    <nav className="flex flex-col gap-2 justify-end p-6 bg-blue-300 w-full text-white text-3xl">
      <div className="flex justify-between align-middle">
        Weather App
        <div
          className={classNames("p-1 flex align-middle gap-2", {
            "bg-red-500": !isValid.value,
            "bg-green-500": isValid.value,
          })}
        >
          ZIP:{" "}
          <input
            className={classNames("border-black border text-black text-medium")}
            value={input.value}
            onChange={(e) => (input.value = e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 text-blue-500">
        <Link className={linkClass} to="/home">
          Home
        </Link>
        <Link className={linkClass} to="/current">
          Current Weather
        </Link>
        <Link className={linkClass} to="/forecast">
          Next 3 days
        </Link>
      </div>
    </nav>
  )
}
