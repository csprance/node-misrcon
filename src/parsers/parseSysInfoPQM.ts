/**
 * Name: parseSysInfoPQM
 * Description:
 */
import camelCase from 'camelcase';
import { ParserError } from '../node-misrcon';
import { ISysInfoPQM } from '../types';

export default (response: string): ISysInfoPQM => {
  try {
    const [pqm, pcm] = response
      .replace("[CONSOLE] Executing console command 'sysinfo pqm'", '')
      .split('PCM:');
    const [pqmRequests, pqmInvokes] = pqm.split(';').map(item =>
      item
        .replace('PQM: Requests - ', '')
        .replace(' Invokes - ', '')
        .split(',')
        .filter(item => item.trim().length !== 0)
    );
    return {
      pqm: {
        requests: {
          ...splitToKeys(pqmRequests)
        },
        invokes: {
          ...splitToKeys(pqmInvokes)
        }
      },
      pcm: {
        [camelCase(pcm.split(':')[0])]: pcm.split(':')[1].trim()
      }
    } as ISysInfoPQM;
  } catch (e) {
    throw new ParserError('Not a SysInfo PQM response');
  }
};
const splitToKeys = (val: string[]) =>
  val.reduce((acc, curVal) => {
    const splitVal = curVal.split(':');
    return {
      ...acc,
      [camelCase(splitVal[0].trim())]: splitVal[1].trim()
    };
  }, {});
