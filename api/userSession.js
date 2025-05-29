// api/userSession.js
import { createJWT, verifyJWT } from '../utils/jwt.js';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      const decoded = verifyJWT(token);
      return res.status(200).json({ session: decoded });
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  if (method === 'POST') {
    const { webflowToken, shopifyToken, userId } = req.body;

    if (!webflowToken || !shopifyToken || !userId) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const token = createJWT({ webflowToken, shopifyToken, userId });
    return res.status(200).json({ token });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
