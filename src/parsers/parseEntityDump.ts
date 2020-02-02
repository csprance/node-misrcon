import { ParserError } from '../node-misrcon';
import { ENTITY_ENUM, IEntity } from '../types';

/*
This command can only be used on a development server.
 */
const parseEntityDump = (entityDumpString: string): IEntity[] => {
  const splitEntString = entityDumpString.split('\n').filter((val, idx) => {
    return idx > 1;
  }); // remove first 2
  // remove last 3
  splitEntString.pop();
  splitEntString.pop();
  splitEntString.pop();
  if (splitEntString.length === 0) {
    throw new ParserError('Not an Entity Dump');
  }
  return splitEntString.map(line => {
    const data = line
      .split(' ')
      .filter(i => i)
      .filter(i => !i.startsWith('-'))
      .filter(i => i.length !== 0);
    return {
      active: true,
      id: Number(data[0].replace(':', '')),
      pos: [Number(data[6].replace('(', '')), Number(data[7]), Number(data[8].replace(')', ''))],
      salt: Number(data[2].replace('Salt:', '')),
      type: data[3].split('[')[0] as ENTITY_ENUM
    };
  });
};

export default parseEntityDump;
