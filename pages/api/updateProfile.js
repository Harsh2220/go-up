import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { user_id, name, description, image } = req.body;

      const user = await prisma.profile.update({
        where: {
          auth_id: user_id,
        },
        data: {
          name,
          description,
          image,
        },
      });
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
