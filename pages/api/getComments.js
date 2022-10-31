import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const comments = await prisma.comments.findMany();
      res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
