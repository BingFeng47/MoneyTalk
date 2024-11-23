import { NextApiRequest, NextApiResponse } from 'next';

// You can store the confirmation state in a session or database if necessary
let confirmationRequests = [];

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { name, amount, bank } = req.body;

    if (!name || !amount || !bank) {
      return res.status(400).json({ error: 'name and amount and bank' });
    }

    // Store the confirmation request (can be stored in DB/session if needed)
    confirmationRequests.push({ name, amount, bank });

    // You can use WebSockets, SSE, or polling to notify the client-side (WebSocket is the most efficient)

    // Respond to Lambda that the request was received
    return res.status(200).json({ status: 'success', message: 'Confirmation request received' });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}