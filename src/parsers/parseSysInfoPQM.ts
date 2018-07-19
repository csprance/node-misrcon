/**
 * Name: parseSysInfoPQM
 * Description:
 */
import { ParserError } from '../node-misrcon';
import { ISysInfoPQM } from '../types';
import { camelCase } from '../utils/utils';

const splitToKeys = (val: string[]) =>
  val.reduce((acc, curVal) => {
    const splitVal = curVal.split(':');
    return {
      ...acc,
      [camelCase(splitVal[0].trim())]: splitVal[1].trim()
    };
  }, {});

export default (response: string): ISysInfoPQM => {
  if (!response.includes('PQM: Requests -')) throw new ParserError('Not a SysInfo PQM response');
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
    console.log(e);
    throw new ParserError('Not a SysInfo PQM response');
  }
};
