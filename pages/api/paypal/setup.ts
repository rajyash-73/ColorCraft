import { NextApiRequest, NextApiResponse } from 'next';
import { loadPaypalDefault } from '../../../server/paypal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return loadPaypalDefault(req as any, res as any);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}