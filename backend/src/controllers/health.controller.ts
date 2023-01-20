const healthCheckSync = () => ('OK');

const healthCheckAsync = () => {
  return Promise.resolve('OK');
}

export const healthCheckController = {
  healthCheckSync,
  healthCheckAsync
}

