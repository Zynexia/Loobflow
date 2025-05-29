// api/login.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Biete zwei Login-Optionen an:
  const shopifyAuthUrl = `https://your-backend.com/api/shopifyAuth`;
  const webflowAuthUrl = `https://your-backend.com/api/webflowAuth`;

  res.status(200).json({
    loginOptions: [
      { provider: 'Shopify', url: shopifyAuthUrl },
      { provider: 'Webflow', url: webflowAuthUrl }
    ]
  });
}
