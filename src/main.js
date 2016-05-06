// import _ from 'lodash'
import L from 'leaflet'

import './img/img.jpg'

import './maps/leaflet-google.js'
import GoogleMapsApiLoader from './maps/maps-loader.js'

const MAP_DIV_ID = 'fabulousmap'

const MAP_SETTINGS = {
  maxZoom: 20,
  minZoom: 0,
  zoomControl: true,
  scrollWheelZoom: true,
  attributionControl: false,
  fadeAnimation: false,
}

// window.__SETTINGS__.map = MAP_SETTINGS


L.Icon.Default.imagePath = 'dist/images'

import 'leaflet/dist/leaflet.css'
import './map.css'


function createMapElement (id) {
  const mapElement = document.createElement('div')
  mapElement.id = id
  document.body.appendChild(mapElement)
}

createMapElement(MAP_DIV_ID)

// Init raw leaflet map (no tiles)
let map = new L.Map(MAP_DIV_ID, {
  maxZoom: MAP_SETTINGS.maxZoom,
  minZoom: MAP_SETTINGS.minZoom,
  zoomControl: MAP_SETTINGS.zoomControl,
  scrollWheelZoom: MAP_SETTINGS.scrollWheelZoom,
  attributionControl: MAP_SETTINGS.attributionControl,
  fadeAnimation: MAP_SETTINGS.fadeAnimation,
})

map.setView([48.859, 2.341], 12)

L.control.scale({
  imperial: MAP_SETTINGS.imperialScale,
  position: 'bottomleft',
}).addTo(map)

GoogleMapsApiLoader().then(() => {
  map.addLayer(new L.Google())
})

export default 'alacarte'
