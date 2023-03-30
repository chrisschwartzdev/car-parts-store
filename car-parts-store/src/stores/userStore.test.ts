import { renderHook, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import { handlers } from '../testing/handlers';
import useUserStore from './userStore';

const server = setupServer(...handlers);

describe('userStore', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("logs in properly", async () => {
    const { result } = renderHook(() => useUserStore(it => it));
    await result.current.login({ username: 'TestUser', password: 'password' });
    await waitFor(() => expect(result.current.user?.username).toBe('TestUser'));
  })
})