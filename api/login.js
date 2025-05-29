// utils/apiClient.js

import fetch from 'node-fetch';

export async function verifyShopifyToken(token) {
  try {
    const response = await fetch('https://your-shop-name.myshopify.com/admin/oauth/access_scopes.json', {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Invalid Shopify token');

    const data = await response.json();
    // Du kannst die Benutzerinfo bei Bedarf hier anpassen
    return { email: 'shopify-user@example.com' };
  } catch (error) {
    console.error('Shopify token verification failed:', error);
    return null;
  }
}

export async function verifyWebflowToken(token) {
  try {
    const response = await fetch('https://api.webflow.com/v2/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    if (!response.ok) throw new Error('Invalid Webflow token');

    const user = await response.json();
    return { email: user.email || 'webflow-user@example.com' };
  } catch (error) {
    console.error('Webflow token verification failed:', error);
    return null;
  }
}
