import { renderHook, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import { act } from 'react-dom/test-utils';
import { handlers } from '../testing/handlers';
import useStoreStore from './storeStore';

const server = setupServer(...handlers);

describe('storeStore', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("can fetch items", async () => {
    const { result } = renderHook(() => useStoreStore(it => it));

    await act(async () => {
      await result.current.fetchItems();
    })

    await waitFor(() => expect(result.current.items?.length).toBe(3))
    await waitFor(() => expect((result.current.items ?? [])[0].name).toBe("Beeg Turbo"))
  })
})