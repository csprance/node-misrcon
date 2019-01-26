/**
 * Name: parseSysInfoPQM
 * Description:
 */
import { ParserError } from '../node-misrcon';
import { ISysInfoPQM } from '../types';
import { camelCase } from '../utils/utils';

const defaultSysInfoPQM: ISysInfoPQM = {
  pcm: {
    queueSize: ''
  },
  pqm: {
    invokes: {
      avgResponse: '',
      queueSize: ''
    },
    requests: {
      avgResponse: '',
      queueSize: ''
    }
  }
};

const splitToKeys = (val: string[]): {} =>
  val.reduce((acc, curVal) => {
    const splitVal = curVal.split(':');
    return {
      ...acc,
      [camelCase(splitVal[0].trim())]: splitVal[1].trim()
    };
  }, defaultSysInfoPQM);
export default (response: string): ISysInfoPQM => {
  if (!response.includes('PQM: Requests -')) {
    throw new ParserError('Not a SysInfo PQM response');
  }
  try {
    const [pqm, pcm] = response
      .replace("[CONSOLE] Executing console command 'sysinfo pqm'", '')
      .split('PCM:');
    const [pqmRequests, pqmInvokes] = pqm.split(';').map(item =>
      item
        .replace('PQM: Requests - ', '')
        .replace(' Invokes - ', '')
        .split(',')
        .filter(i => i.trim().length !== 0)
    );

    const value: ISysInfoPQM = {
      ...defaultSysInfoPQM,
      // @ts-ignore
      pcm: {
        [camelCase(pcm.split(':')[0])]: pcm.split(':')[1].trim()
      },
      pqm: {
        // @ts-ignore
        invokes: {
          ...splitToKeys(pqmInvokes)
        },
        // @ts-ignore
        requests: {
          ...splitToKeys(pqmRequests)
        }
      }
    };
    return value;
  } catch (e) {
    throw new ParserError('Not a SysInfo PQM response');
  }
};
