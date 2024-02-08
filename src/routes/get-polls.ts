import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { redis } from "../lib/redis";

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


    const result = await redis.zrange(idPoll, 0, -1, 'WITHSCORES')

    const votes = result.reduce((obj, line, index) => {
      if(index % 2 === 0){
        const score = result[index + 1]

        Object.assign(obj, { [line]: Number(score) })
      }

      return obj
    }, {} as Record<string, number>)

    return reply.send({
      poll: {
        id: poll?.id,
        title: poll?.title,
        options: poll?.options.map(option => {
          return {
            id: option.id,
            title: option.title,
            score: (option.id in votes) ? votes[option.id] : 0
          }
        })
      }
    });
  });
}
