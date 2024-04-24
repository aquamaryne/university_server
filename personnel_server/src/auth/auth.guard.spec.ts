import { AuthGuards } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuards()).toBeDefined();
  });
});
