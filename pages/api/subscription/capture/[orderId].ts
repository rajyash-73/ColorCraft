import { NextApiRequest, NextApiResponse } from 'next';
import { captureSubscription } from '../../../../server/paypal';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return captureSubscription(req as any, res as any);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}