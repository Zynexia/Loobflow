// api/login.js
import { createJWT } from '../utils/jwt.js';
import { verifyShopifyToken, verifyWebflowToken } from '../utils/apiClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, provider } = req.body;

  try {
    let userData;

    if (provider === 'shopify') {
      userData = await verifyShopifyToken(token);
    } else if (provider === 'webflow') {
      userData = await verifyWebflowToken(token);
    } else {
      return res.status(400).json({ error: 'Unsupported provider' });
    }

    if (!userData || !userData.email) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const jwt = createJWT({ email: userData.email, provider });
    return res.status(200).json({ token: jwt });
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
}
