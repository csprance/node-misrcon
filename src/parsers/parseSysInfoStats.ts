/**
 * Name: parseSysInfoStats
 * Description:
 */
import { ParserError } from '../node-misrcon';
import { ISysInfoStats } from '../types';

export const defaultSysInfoState: ISysInfoStats = {
  dn: '',
  pmu: '',
  pmup: '',
  rate: '',
  tpm: '',
  tvm: '',
  up: '',
  upd: '',
  uptime: '',
  vmu: '',
  vmup: ''
};

export default (response: string): ISysInfoStats => {
  if (!response.includes('upd: ')) {
    throw new ParserError('Not a SysInfo Stats Response');
  }
  try {
    return response
      .replace("[CONSOLE] Executing console command 'sysinfo stats'", '')
      .split(',')
      .map(item => {
        const splitItems = item.split(':');
        return {
          [splitItems[0].trim()]: splitItems[1].trim()
        };
      })
      .reduce((acc, curVal) => ({ ...acc, ...curVal }), defaultSysInfoState);
  } catch (e) {
    throw new ParserError('Not a SysInfo Stats Response');
  }
};
