import { useSignal } from "@preact/signals-react"

/**
 * @callback AsyncCallback
 * @returns {Promise<any>}
 */

/**
 *
 * @param {AsyncCallback} callback
 *
 * @param {object | null} config
 * @param {boolean} config.hold
 */
export function useAsync(callback, config = {}) {
  const data = useSignal(null)
  const pending = useSignal(false)
  const error = useSignal(null)

  async function execute(...args) {
    pending.value = true
    error.value = null

    if (!config.hold) data.value = null

    const promise = callback(...args).catch((err) => (error.value = err))

    promise
      .then((response) => (data.value = response))
      .finally(() => (pending.value = false))

    return promise
  }

  return {
    data: data.value,
    pending: pending.value,
    error: error.value,
    execute,
  }
}
