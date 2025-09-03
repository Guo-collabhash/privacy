import { pool } from '../db/index.js';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  const account = new URL(req.url, 'http://localhost').searchParams.get('account');
  if (!account) return res.status(400).json({ error: 'account required' });

  const { rows } = await pool.query(
    'SELECT payload FROM user_data WHERE account=$1',
    [account]
  );
  if (!rows.length) return res.json({ tasks: [], reviews: [] });
  res.json(rows[0].payload);
};