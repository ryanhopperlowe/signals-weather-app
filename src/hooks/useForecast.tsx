import { useSignalEffect } from "@preact/signals-react"
import { getForecast, userZip } from "../signals"

export function useForecast() {
  useSignalEffect(() => {
    if (!userZip.value) return

    // use peek to avoid infinite loop
    // peek treats the signal similarly to useRef so it will not subscribe to changes
    getForecast.peek().execute()
  })

  return getForecast.value
}
