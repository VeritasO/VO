import { describe, expect, test, jest, beforeEach } from '@jest/globals';

// Allow longer time for exponential backoff retries in tests
jest.setTimeout(20000);
import OpenAI from 'openai';
import { askGPTReal, askGPTWithRetry, openAIConfig } from '../jobs/openaiClient';

// Mock OpenAI module
jest.mock('openai');

describe('OpenAI Client', () => {
  beforeEach(() => {
    // Reset environment between tests
    process.env.OPENAI_API_KEY = 'test-key';
    process.env.OPENAI_MODEL = 'test-model';
    jest.clearAllMocks();
  });

  test('askGPTReal creates client with correct config', async () => {
  const mockCreateCompletion: any = jest.fn();
  mockCreateCompletion.mockResolvedValue({ choices: [{ message: { content: 'test response' } }] } as any);

    // Mock OpenAI constructor and methods
  (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreateCompletion
        }
      }
    }));

  await askGPTReal('system prompt', 'user prompt');

  // Only assert apiKey to avoid environment-specific organization differences
  expect(OpenAI).toHaveBeenCalledWith(expect.objectContaining({ apiKey: 'test-key' }));
  });

  test('askGPTReal uses correct model based on type', async () => {
  const mockCreateCompletion: any = jest.fn();
  mockCreateCompletion.mockResolvedValue({ choices: [{ message: { content: 'test response' } }] } as any);

  (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreateCompletion
        }
      }
    }));

  // Ensure no environment override for model
  delete process.env.OPENAI_MODEL;
  await askGPTReal('system prompt', 'user prompt', 'research');

    expect(mockCreateCompletion).toHaveBeenCalledWith(
      expect.objectContaining({
        model: openAIConfig.models.research
      })
    );
  });

  test('askGPTWithRetry retries on failure', async () => {
    const mockCreateCompletion: any = jest.fn();
    mockCreateCompletion
      .mockRejectedValueOnce(new Error('API error') as any)
      .mockRejectedValueOnce(new Error('API error') as any)
      .mockResolvedValueOnce({ choices: [{ message: { content: 'success' } }] } as any);

  (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreateCompletion
        }
      }
    }));

    const result = await askGPTWithRetry('system', 'user');
    
    expect(mockCreateCompletion).toHaveBeenCalledTimes(3);
    expect(result).toBe('success');
  });

  test('askGPTWithRetry throws after max retries', async () => {
  const mockCreateCompletion: any = jest.fn();
  mockCreateCompletion.mockRejectedValue(new Error('API error') as any);

    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreateCompletion
        }
      }
    }));

    await expect(askGPTWithRetry('system', 'user')).rejects.toThrow('API error');
    expect(mockCreateCompletion).toHaveBeenCalledTimes(3);
  });
});
