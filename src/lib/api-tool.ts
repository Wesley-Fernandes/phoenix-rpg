import { type NextApiRequest } from 'next';

async function parser(request: NextApiRequest) {
  const chunks: Buffer[] = [];

  // Collect all the chunks of the body as the request is a stream
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  // Join the chunks and convert to a string
  const body = Buffer.concat(chunks).toString();

  // Parse the body string into JSON
  return JSON.parse(body);
}

export default parser;
