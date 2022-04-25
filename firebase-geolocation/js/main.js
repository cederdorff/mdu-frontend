"use strict";

import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1LrY_P1ivohPTKdv1dVT9Y3tNm0I7zHY",
  authDomain: "geolocation-app-23a38.firebaseapp.com",
  databaseURL: "https://geolocation-app-23a38.firebaseio.com",
  projectId: "geolocation-app-23a38",
  storageBucket: "geolocation-app-23a38.appspot.com",
  messagingSenderId: "218508570600",
  appId: "1:218508570600:web:cb23db5ad6561352a8be5d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const _db = firebase.firestore();
const _locationRef = _db.collection("locations");
let _locations = [];

/**
 * Get current device location
 */
async function getCurrentLocation() {
  const location = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return {
    longitude: location.coords.longitude,
    latitude: location.coords.latitude,
  };
}

/**
 * Load locations from Firebase and watch for changes
 */
async function loadLocations() {
  let currentLocation = await getCurrentLocation();

  // watch the database ref for changes
  _locationRef.onSnapshot(snapshotData => {
    _locations = [];
    snapshotData.forEach(doc => {
      let location = doc.data();
      location.id = doc.id;
      //adding the property distance - calculated by current lat and long + the object's (doc from Firebase) lat and long
      location.distance = calcDistance(currentLocation.latitude, currentLocation.longitude, location.location.latitude, location.location.longitude);
      _locations.push(location);
    });

    // Sorting the array _locations by the distance property 
    _locations.sort(function (a, b) {
      return a.distance - b.distance;
    });

    console.log(_locations);
    appendLocations();
  });
}

loadLocations();

/**
 * Calculating the distance from on location to another: lat1 & lon1 to lat2 & lon2
 * Used to calculate the distance between the device and the location
 */
function calcDistance(lat1, lon1, lat2, lon2, unit = "K") {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}


function appendLocations() {
  let template = "";
  for (const location of _locations) {
    template += /*html*/`
      <article>
        <h2>${location.name}</h2>
      </article>
    `;
  }
  document.getElementById("content").innerHTML = template;
}