import { Article } from '../../lib/models/Article';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req: any, res: any) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const {
        category,
        status,
        search,
        featured,
        limit = 50,
        skip = 0,
      } = req.query;
      // Prepare the query object
      const query: any = {};

      // Filter by category
      if (category && category !== "all") {
        query.category = new RegExp(category as string, "i");
      }

      // Filter by status
      if (status) {
        query.status = status;
      }

      // Filter by featured
      if (featured !== undefined) {
        query.featured = featured === "true";
      }

      // Search functionality
      if (search) {
        query.$or = [
          { title: new RegExp(search as string, "i") },
          { excerpt: new RegExp(search as string, "i") },
          { author: new RegExp(search as string, "i") },
          { tags: { $in: [new RegExp(search as string, "i")] } },
        ];
      }

      const articles = await Article.find(query)
        .sort({ publishedAt: -1 })
        .limit(parseInt(limit as string))
        .skip(parseInt(skip as string));

      res.status(200).json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  } else if (req.method === "POST") {
    try {
      const articleData = {
        ...req.body,
        publishedAt: req.body.publishedAt || new Date(),
      };

      const article = new Article(articleData);
      const savedArticle = await article.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      console.error("Error creating article:", error);
      res
        .status(400)
        .json({
          error: "Failed to create article",
          details: (error as Error).message,
        });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}