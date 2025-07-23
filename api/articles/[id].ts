import { Article } from "../../lib/models/Article";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  // Always connect inside the handler
  try {
    await connectToDatabase();
  } catch (e) {
    console.error("DB connection failed:", e);
    return res.status(500).json({ error: "Database connection failed" });
  }

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ error: "Failed to fetch article" });
    }
  } else if (req.method === "PUT") {
    try {
      const article = await Article.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      res.status(200).json(article);
    } catch (error) {
      console.error("Error updating article:", error);
      res
        .status(400)
        .json({
          error: "Failed to update article",
          details: (error as Error).message,
        });
    }
  } else if (req.method === "DELETE") {
    try {
      const article = await Article.findByIdAndDelete(id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
      console.error("Error deleting article:", error);
      res.status(500).json({ error: "Failed to delete article" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
