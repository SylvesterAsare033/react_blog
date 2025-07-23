import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: any, res: any) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      // Return default categories for now
      const defaultCategories = [
        { id: '1', name: 'All', slug: 'all' },
        { id: '2', name: 'Technology', slug: 'technology' },
        { id: '3', name: 'Business', slug: 'business' },
        { id: '4', name: 'Sports', slug: 'sports' },
        { id: '5', name: 'Entertainment', slug: 'entertainment' },
        { id: '6', name: 'Science', slug: 'science' },
      ];
      
      res.status(200).json(defaultCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}