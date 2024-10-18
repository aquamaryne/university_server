import { ApiKeyMiddleware } from './api_key.middleware';

describe('ApiKeyMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiKeyMiddleware()).toBeDefined();
  });
});
