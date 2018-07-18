/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import misrcon, { ParserError } from '../src/node-misrcon';

describe('parseSysInfoPQM', () => {
  it('sysinfo pqm live', () => {
    const sysInfo = misrcon.parseSysInfoPQM(mock.sysInfoPQM);
    expect(sysInfo.pcm.queueSize).toEqual('0');
  });

  it('sysinfo pqm dev', () => {
    const sysInfo = misrcon.parseSysInfoPQM(mock.sysInfoPQMDev);
    expect(sysInfo.pcm.queueSize).toEqual('0');
  });

  it('should throw ParserError', () => {
    try {
      misrcon.parseSysInfoStats('Some other random String');
    } catch (e) {
      expect(e instanceof ParserError).toEqual(true);
    }
  });
});
