/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import * as misrcon from '../src/node-misrcon';

describe('parseEntityDump', () => {
  it('es_dump_entities', () => {
    const entityDump = misrcon.parseEntityDump(mock.entityDumpDev);
    expect(entityDump[0]).toEqual({
      active: true,
      id: 1583,
      pos: [1961.46, 3729.01, 38.47],
      salt: 2,
      type: 'quadbike'
    });
    expect(entityDump[1].pos).toEqual([398.37, 2505.45, 39.73]);
    expect(entityDump.length).toEqual(4);
  });
});
