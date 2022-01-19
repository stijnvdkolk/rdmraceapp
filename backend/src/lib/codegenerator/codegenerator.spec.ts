import { codeGenerator } from '.';

describe('CodeGenerator', () => {
  it('should return a string', () => {
    expect(typeof codeGenerator()).toBe('string');
  });

  it('should return a string with length of 7', () => {
    expect(codeGenerator()).toHaveLength(7);
  });
});
