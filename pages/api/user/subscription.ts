import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Update user subscription status after successful payment
    const { userId, subscriptionStatus, subscriptionId, subscriptionPlan, subscriptionCountry } = req.body;
    
    try {
      // Here we would update the user in the database
      // For now, we'll return success as the system is using localStorage
      res.status(200).json({ 
        message: 'Subscription updated successfully',
        user: {
          id: userId,
          subscriptionStatus,
          subscriptionId,
          subscriptionPlan,
          subscriptionCountry
        }
      });
    } catch (error) {
      console.error('Failed to update subscription:', error);
      res.status(500).json({ error: 'Failed to update subscription' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}