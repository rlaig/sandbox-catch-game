import { Router, Request, Response } from 'express'
import { healthCheckController } from '../controllers/health.controller'

export default () => {
  const router = Router()

  router.get('/health/sync', (req: Request, res: Response) => {
    const result = healthCheckController.healthCheckSync();
    res.json({
      status: 'ok',
      health: result
    });
  });

  router.get('/health/async', async (req: Request, res: Response) => {
    const result = await healthCheckController.healthCheckAsync();
    res.json({
      status: 'ok',
      health: result
    });
  });

  return router
}
