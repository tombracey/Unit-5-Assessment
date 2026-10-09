export async function geocode(query: string) {
  const apiKey = process.env.GEOCODE_API_KEY;

  const response = await fetch(
    `https://geocode.maps.co/search?q=${encodeURIComponent(query)}&api_key=${apiKey}`
  );

  const responseBody = await response.text();
  const results = JSON.parse(responseBody);

  if (!results || results.length === 0) {
    throw new Error("Location not found");
  }

  return {
    latitude: parseFloat(results[0].lat),
    longitude: parseFloat(results[0].lon)
  };
}