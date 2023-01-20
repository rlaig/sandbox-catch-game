import { healthCheckController } from '../health.controller'

describe('Test /health', () => {

  describe('Health check on /sync', () => {
    it('health should be okay', () => {
      const actualResult = healthCheckController.healthCheckSync();
      expect(actualResult).toEqual('OK');
    });
  });

  describe('Health check on /async', () => {
    it('health should be okay', async () => {
      const actualResult = await healthCheckController.healthCheckAsync();
      expect(actualResult).toEqual('OK');
    });
  });
});
