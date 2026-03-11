import { describe, it, expect, vi } from 'vitest';

// Mock the Anthropic SDK before importing the route
vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      stream: vi.fn().mockReturnValue({
        [Symbol.asyncIterator]: async function* () {},
      }),
    },
  })),
}));

const { POST } = await import('../chat/route');

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

describe('POST /api/chat — input validation', () => {
  it('returns 401 when API key is missing', async () => {
    const req = makeRequest({ messages: [], model: 'claude-sonnet-4-6' });
    const res = await POST(req as never);
    expect(res.status).toBe(401);
  });

  it('returns 401 when API key has wrong prefix', async () => {
    const req = makeRequest(
      { messages: [], model: 'claude-sonnet-4-6' },
      { 'X-Anthropic-Key': 'invalid-key' }
    );
    const res = await POST(req as never);
    expect(res.status).toBe(401);
  });

  it('returns 400 when body is not valid JSON', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Anthropic-Key': 'sk-ant-test' },
      body: 'not-json',
    });
    const res = await POST(req as never);
    expect(res.status).toBe(400);
  });

  it('returns 400 when messages is missing', async () => {
    const req = makeRequest(
      { model: 'claude-sonnet-4-6' },
      { 'X-Anthropic-Key': 'sk-ant-test' }
    );
    const res = await POST(req as never);
    expect(res.status).toBe(400);
  });

  it('returns 400 for an unknown model', async () => {
    const req = makeRequest(
      { messages: [], model: 'gpt-4' },
      { 'X-Anthropic-Key': 'sk-ant-test' }
    );
    const res = await POST(req as never);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/unknown model/i);
  });
});
