import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, name, description, image, github, link } = req.body;

      const project = await prisma.project.create({
        data: {
          name,
          description,
          image,
          github,
          link,
          profile: {
            connect: {
              auth_id: user_id,
            },
          },
        },
      });
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
