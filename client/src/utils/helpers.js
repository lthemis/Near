export const calculateDistanceInMeters = (userLocation, itemLocation) => {
  const userLat = userLocation.latitude;
  const userLon = userLocation.longitude;
  const itemLat = itemLocation.latitude;
  const itemLon = itemLocation.longitude;

  // source: https://www.movable-type.co.uk/scripts/latlong.html
  const R = 6371e3; // metres
  const φ1 = (userLat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (itemLat * Math.PI) / 180;
  const Δφ = ((itemLat - userLat) * Math.PI) / 180;
  const Δλ = ((itemLon - userLon) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
};
