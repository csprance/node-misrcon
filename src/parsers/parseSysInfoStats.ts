/**
 * Name: parseSysInfoStats
 * Description:
 */
import { ParserError } from '../node-misrcon';
import { ISysInfoStats } from '../types';

export default (response: string): ISysInfoStats => {
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
      .reduce((acc, curVal) => ({ ...acc, ...curVal }), {} as ISysInfoStats);
  } catch (e) {
    throw new ParserError('Not a SysInfo Stats Response');
  }
};
