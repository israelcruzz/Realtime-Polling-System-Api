import fastify from "fastify";
import { prisma } from "../database/prisma";
import { z } from "zod";

const app = fastify();
const port = 3030;

app.get("/", async (request, reply) => {
  const createBodyPoll = z.object({
    title: z.string(),
  });

  const { title } = createBodyPoll.parse(request.body);

  const poll = await prisma.poll.create({
    data: {
      title,
    },
  });

  return reply.status(201).send({ pollId: poll.id })
});

app
  .listen({
    port,
  })
  .then(() => console.log(`Server Online in http://localhost:${port}`));
