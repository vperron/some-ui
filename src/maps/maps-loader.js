/* globals google */

let isLoading = false
let globalResolve = null
let promise = new Promise((resolve) => {
  globalResolve = resolve
})

export default function () {
  if (typeof google === 'undefined' || !google.maps) {
    // Ensure it loads only once
    if (!isLoading) {
      window.initMap = globalResolve
      let script = document.createElement('script')
      script.src = '//maps.googleapis.com/maps/api/js?language=en&callback=initMap'
      document.body.appendChild(script)
      isLoading = true
    }
  } else {
    return globalResolve
  }
  return promise
}
