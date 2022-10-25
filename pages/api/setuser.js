import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, name, image } = req.body;

      const alreadyuser = await prisma.profile.findFirst({
        where: {
          auth_id: user_id,
        },
      });

      if (!alreadyuser) {
        const user = await prisma.profile.create({
          data: {
            auth_id: user_id,
            name: name,
            image: image,
          },
        });
        res.status(200).json({ user: user });
      }

      res.status(200).json({ user: alreadyuser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}
