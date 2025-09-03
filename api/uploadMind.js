import { pool } from '../db/index.js';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  if (req.method === 'POST') {
    const { account, mind } = req.body;          // mind 是整张图 JSON
    if (!account) return res.status(400).json({ error: 'account required' });

    await pool.query(
      `INSERT INTO user_mind(account, payload) VALUES($1,$2)
       ON CONFLICT (account) DO UPDATE
       SET payload=$2, updated=NOW()`, [account, JSON.stringify(mind)]
    );
    return res.json({ ok: true });
  }
  res.status(405).end();
};
