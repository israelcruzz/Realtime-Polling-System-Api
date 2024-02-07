import fastify from "fastify";
import cookie from '@fastify/cookie'
import { createPoll } from "../routes/create-poll";
import { getPoll } from '../routes/get-polls'
import { votePoll } from '../routes/vote-polls'

const app = fastify();
const port = 3030;

app.register(cookie, {
  secret: 'polls-secret',
  hook: "onRequest"
})

app.register(createPoll);
app.register(getPoll);
app.register(votePoll)

app
  .listen({
    port,
  })
  .then(() => console.log(`Server Online in http://localhost:${port}`));
