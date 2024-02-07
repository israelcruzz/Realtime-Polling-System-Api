import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma";
import { z } from "zod";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:idPoll", async (request, reply) => {
    const createBodyPoll = z.object({
      idPoll: z.string().uuid(),
    });

    const { idPoll } = createBodyPoll.parse(request.body);

    const poll = await prisma.poll.findUnique({
      where: {
        id: idPoll,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return reply.send({ poll });
  });
}
