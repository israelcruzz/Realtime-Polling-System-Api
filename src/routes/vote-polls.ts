import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function votePoll(app: FastifyInstance) {
  app.post("/polls/:pollId/vote", async (request, reply) => {
    const voteBodyPoll = z.object({
      pollOptionId: z.string().uuid(),
    });

    const voteParamsPoll = z.object({
      pollId: z.string().uuid(),
    });

    const { pollOptionId } = voteBodyPoll.parse(request.body);
    const { pollId } = voteParamsPoll.parse(request.body);

    let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVotePoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      });

      if(userPreviousVotePoll && userPreviousVotePoll.pollOptionId !== pollOptionId){
        await prisma.vote.delete({
            where: {
                id: userPreviousVotePoll.id
            }
        })
      } else if (userPreviousVotePoll){
        return reply.status(400).send({ message: "You already voted on this poll." })
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
        data: {
            sessionId,
            pollOptionId,
            pollId
        }
    })

    return reply.send({ sessionId });
  });
}
