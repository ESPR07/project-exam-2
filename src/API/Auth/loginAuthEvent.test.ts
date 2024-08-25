import { renderHook, act } from '@testing-library/react';
import { loginAuthEvents } from './loginAuthEvent';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('APIFetch function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully logs in the user', async () => {
    const fakeResponse = {
      data: {
        name: 'Username',
        accessToken: 'Fake Key',
        avatar: { url: 'Image URL' },
        banner: { url: 'Banner URL' },
        venueManager: true,
      }
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(fakeResponse),
    });

    const { result } = renderHook(() => loginAuthEvents());

    let response: Response | undefined;
    await act(async () => {
      response = await result.current.APIFetch('test.test', {});
    });

    // Verify that fetch was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith('test.test', expect.any(Object));

    // Ensure that response is not undefined
    expect(response).toBeDefined();

    if (response) {
      // Verify that the returned response matches the mock
      expect(response.ok).toBe(true);
      const responseData = await response.json();
      expect(responseData).toEqual(fakeResponse);
    }
  });

  it('handles an error response correctly', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => loginAuthEvents());

    let response: Response | undefined;
    await act(async () => {
      response = await result.current.APIFetch('test.test', {});
    });

    // Verify that fetch was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith('test.test', expect.any(Object));

    // Ensure that response is not undefined
    expect(response).toBeDefined();

    if (response) {
      // Verify that the response was not ok
      expect(response.ok).toBe(false);
    }
  });

  it('handles a network error correctly and returns undefined', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => loginAuthEvents());

    let response: Response | undefined;
    await act(async () => {
      response = await result.current.APIFetch('test.test', {});
    });

    // Verify that fetch was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith('test.test', expect.any(Object));

    // Verify that the response is undefined due to the network error
    expect(response).toBeUndefined();
  });
});