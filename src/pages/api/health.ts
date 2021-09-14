import { NextApiRequest, NextApiResponse } from 'next';

export default function healthRouteHandler(req: NextApiRequest, res: NextApiResponse): void {
  res.json({ status: 'ok' });
}
