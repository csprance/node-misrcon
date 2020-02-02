/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import { dev } from '../secrets';
import * as misrcon from '../src/node-misrcon';

describe('parseEntityDump', () => {
  it('es_dump_entities 1', () => {
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

  it('es_dump_entities 2', () => {
    const entityDump = misrcon.parseEntityDump(mock.entityDumpDev2);
    expect(entityDump[0]).toEqual({
      active: true,
      id: 63702,
      pos: [1991.41, 2546.68, 51.09],
      salt: 1,
      type: 'tractor'
    });
    expect(entityDump.length).toEqual(1);
  });

  it('es_dump_entities dev server', async () => {
    const server = new misrcon.NodeMisrcon(dev);
    const response = await server.send('es_dump_entities quadbike');
    const entityDump = misrcon.parseResponse(response);
    if (entityDump && entityDump.type === 'entity dump') {
      expect(entityDump && entityDump.type === 'entity dump').toEqual(true);
    }
  });

  it('es_dump_entities parseResponse', () => {
    const entityDump = misrcon.parseResponse(mock.entityDumpDev2);
    if (entityDump && entityDump.type === 'entity dump') {
      expect(entityDump.data[0]).toEqual({
        active: true,
        id: 63702,
        pos: [1991.41, 2546.68, 51.09],
        salt: 1,
        type: 'tractor'
      });
      expect(entityDump.data.length).toEqual(1);
    }
  });
});
