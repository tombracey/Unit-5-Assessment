"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displacementInKm = displacementInKm;
function displacementInKm(aLat, aLon, bLat, bLon) {
    // Using Pythag to find the coordinate displacement between the user and shop:
    const coordinatesHypotenuse = Math.sqrt(Math.pow(aLat - bLat, 2) +
        Math.pow(aLon - bLon, 2));
    const kmMultiplier = 111.32;
    return coordinatesHypotenuse * kmMultiplier;
}
