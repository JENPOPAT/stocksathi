exports.handler = async (event) => {
  const url = event.queryStringParameters?.url;
  if (!url) return { statusCode: 400, body: 'Missing url' };

  try {
    const fetch = (await import('node-fetch')).default;
    const res = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://finance.yahoo.com'
      }
    });
    const data = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
