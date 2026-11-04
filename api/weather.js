
export default async function handler(req, res) {
  const { city, type } = req.query;

  if (!city || !['current', 'forecast'].includes(type)) {
    return res.status(400).json({
      message: 'Invalid city or weather type'
    });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      message: 'Weather API key is not configured'
    });
  }

  const endpoint =
    type === 'current' ? 'weather' : 'forecast';

  const url = new URL(
    `https://api.openweathermap.org/data/2.5/${endpoint}`
  );

  url.searchParams.set('q', city);
  url.searchParams.set('appid', apiKey);
  url.searchParams.set('units', 'metric');

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || 'Weather API request failed'
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Weather API error:', error);

    return res.status(500).json({
      message: 'Unable to fetch weather information'
    });
  }
}
