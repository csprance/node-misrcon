/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import * as misrcon from '../src/node-misrcon';

describe('parseSysInfoStats', () => {
  it('sysinfo stats live', () => {
    const sysInfo = misrcon.parseSysInfoStats(mock.sysInfoStats);
    expect(sysInfo.upd).toBe('9.2ms (7.82..10.89)');
  });

  it('sysinfo stats dev', () => {
    const sysInfo = misrcon.parseSysInfoStats(mock.sysInfoStatsDev);
    expect(sysInfo.upd).toBe('2.5ms (2.37..3.28)');
  });

  it('should throw ParserError', () => {
    try {
      misrcon.parseSysInfoStats('Some other random String');
    } catch (e) {
      expect(e instanceof misrcon.ParserError).toEqual(true);
    }
  });
});
