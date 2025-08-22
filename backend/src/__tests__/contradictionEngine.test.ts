import { findContradictions } from '../core/contradictionEngine';

describe('findContradictions', () => {
  it('detects contradictions', () => {
  const result = findContradictions(['A', '!A']);
  // Engine detects a single contradiction pair (A vs !A)
  expect(result.length).toBe(1);
  });

  it('returns empty when no contradictions', () => {
    const result = findContradictions(['A', 'B']);
    expect(result.length).toBe(0);
  });

  // Enhanced test cases for the updated contradiction engine
  // Add more scenarios to ensure comprehensive coverage
});
