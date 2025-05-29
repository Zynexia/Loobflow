// api/shopifyAuth.js
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;
const SCOPES = 'read_products,write_products';
const REDIRECT_URI = 'https://your-vercel-app.vercel.app/api/shopifyAuth/callback';

export default async function handler(req, res) {
  const { query } = req;

  // Wenn keine Auth-Anfrage, leite zum Shopify-Login
  if (!query.code) {
    const { shop } = query;

    if (!shop) return res.status(400).send('Shop-URL fehlt.');

    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}`;

    return res.redirect(installUrl);
  }

  // Wenn Shopify mit Code zurückkehrt, tausche Code gegen Access Token
  const { shop, code } = query;

  const tokenUrl = `https://${shop}/admin/oauth/access_token`;
  const result = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }),
  });

  const data = await result.json();

  if (data.access_token) {
    // Speichern, Session anlegen oder JWT erzeugen
    // Beispiel: res.redirect(`/dashboard?shop=${shop}`)
    return res.status(200).json({ success: true, shop, token: data.access_token });
  }

  return res.status(401).json({ error: 'Shopify OAuth fehlgeschlagen' });
}
