import { signal, effect } from "@preact/signals-react"

export const userZip = signal(getZipFromLocalStorage())
effect(() => {
  localStorage.setItem("user-zip", userZip.value)
  console.log("updated user zip to ", userZip.value)
})

function getZipFromLocalStorage() {
  return localStorage.getItem("user-zip") || ""
}
