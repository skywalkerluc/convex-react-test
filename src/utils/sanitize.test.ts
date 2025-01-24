import { sanitizeBusinessName } from "./sanitize";


describe('sanitizeBusinessName', () => {
  it('should clean problematic names', () => {
    expect(sanitizeBusinessName('"A Cheeky Slice"')).toBe('A Cheeky Slice');
    expect(sanitizeBusinessName('!NOSH!')).toBe('!NOSH!');
    expect(sanitizeBusinessName('"Mills Hill Infant School"')).toBe('Mills Hill Infant School');
    expect(sanitizeBusinessName('  "MU"  ')).toBe('MU');
    expect(sanitizeBusinessName('""Buttylicious""')).toBe('Buttylicious');
    expect(sanitizeBusinessName('Regular name (no problems)')).toBe('Regular name (no problems)');
  });
});