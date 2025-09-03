import { pool } from '../db/index.js';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  if (req.method === 'GET') {
    const account = req.headers['x-account'] || req.query.account;
    if (!account) return res.status(400).json({ error: 'account header/query required' });

    const { rows } = await pool.query(
      'SELECT payload FROM user_mind WHERE account=$1', [account]
    );
    if (!rows.length) return res.status(404).json({ error: 'not found' });
    return res.json({ mind: rows[0].payload });
  }
  res.status(405).end();
};
