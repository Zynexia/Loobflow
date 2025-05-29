// api/webflowAuth.js

const CLIENT_ID = process.env.WEBFLOW_CLIENT_ID;
const CLIENT_SECRET = process.env.WEBFLOW_CLIENT_SECRET;
const REDIRECT_URI = process.env.WEBFLOW_REDIRECT_URI;

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    const response = await fetch('https://api.webflow.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      return res.status(200).json({ token: data.access_token, site: data.site });
    } else {
      return res.status(400).json({ error: 'Token exchange failed', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: 'OAuth error', message: err.message });
  }
}
