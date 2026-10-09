export function displacementInKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  // Using Pythag to find the coordinate displacement between the user and shop:
  const coordinatesHypotenuse = Math.sqrt(
    Math.pow(aLat - bLat, 2) +
    Math.pow(aLon - bLon, 2)
  );
  const kmMultiplier = 111.32;
  return coordinatesHypotenuse * kmMultiplier;
}