import { signal, computed } from "@preact/signals-react"

export function signalAsync(callback) {
  const data = signal(null)
  const pending = signal(false)
  const error = signal(null)

  async function execute() {
    pending.value = true
    error.value = null
    data.value = null

    const promise = callback().catch((err) => (error.value = err))

    promise
      .then((response) => (data.value = response))
      .finally(() => (pending.value = false))

    return promise
  }

  return computed(() => ({
    data: data.value,
    pending: pending.value,
    error: error.value,
    execute,
  }))
}
