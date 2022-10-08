import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, name, description, link } = req.body;

      console.log(user_id, name, description);

      const project = await prisma.project.create({
        data: {
          user_id,
          name,
          description,
          link,
        },
      });
      res.status(200).json({ message: "Project created successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
