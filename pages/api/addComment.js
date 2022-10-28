import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, comment, project_id } = req.body;

      console.log(req.body);

      const addedComment = await prisma.comments.create({
        data: {
          user_id,
          comment,
          project: {
            connect: {
              id: project_id,
            },
          },
        },
      });
      console.log(addedComment);
      res.status(200).json(addedComment);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
