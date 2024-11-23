import { NextApiRequest, NextApiResponse } from 'next';

let confirmationRequests: { name: string; amount: number; bank: string }[] = [];

// POST handler for receiving confirmation requests
export async function POST(req: Request) {
  const { name, amount, bank } = await req.json();  // Use req.json() to parse the body

  // Validate incoming data
  if (!name || !amount || !bank) {
    return new Response(
      JSON.stringify({ error: 'Name, amount, and bank are required.' }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',  // Allow all origins
          'Access-Control-Allow-Methods': 'POST, OPTIONS',  // Allow POST and OPTIONS methods
          'Access-Control-Allow-Headers': 'Content-Type',  // Allow specific headers
        }
      }
    );
  }

  // Store the confirmation request
  confirmationRequests.push({ name, amount, bank });

  // Respond with success
  return new Response(
    JSON.stringify({ status: 'success', message: 'Confirmation request received' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow all origins
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}