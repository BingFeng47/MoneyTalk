import { NextApiRequest, NextApiResponse } from 'next';

let confirmationRequests: { name: string; amount: number; bank: string }[] = [];

// POST handler for receiving confirmation requests
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle preflight CORS (OPTIONS request)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow POST and OPTIONS methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, amount, bank } = req.body;

    // Validate incoming data
    if (!name || !amount || !bank) {
      return res.status(400).json({ error: 'Name, amount, and bank are required.' });
    }

    // Store the confirmation request
    confirmationRequests.push({ name, amount, bank });

    // Respond with success
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json({ status: 'success', message: 'Confirmation request received' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default handler;