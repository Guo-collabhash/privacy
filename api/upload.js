import { pool } from '../db/index.js';   // 同上一回答的 db/index.js

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  if (req.method === 'POST') {
    const { account, tasks, reviews } = req.body;
    if (!account) return res.status(400).json({ error: 'account required' });

    await pool.query(
      `INSERT INTO user_data(account, payload) VALUES($1,$2)
       ON CONFLICT (account) DO UPDATE
       SET payload=$2, updated=NOW()`,
      [account, JSON.stringify({ tasks, reviews })]
    );
    return res.json({ ok: true });
  }
  res.status(405).end();
};