import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await prisma.profile.findMany();
      res.status(200).json({ allUsers: users });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
