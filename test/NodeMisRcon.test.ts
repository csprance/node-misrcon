/* global it, describe, before, after */
import * as misrcon from '../src/node-misrcon';

import { us75 } from '../secrets';

describe('NodeMisRcon Class', () => {
  const server = new misrcon.NodeMisrcon(us75);

  it('ban list', async () => {
    const banlist = await server.getBanList();
    expect(banlist.length).toBe(0);
  });

  it('status', async () => {
    const status = await server.getStatus();
    expect(status.name).toBe('Official Miscreated - i3D.net - US75 #2006');
  });

  it('whitelist', async () => {
    const whitelist = await server.getWhitelist();
    expect(whitelist.length).toBe(0);
  });

  it('sysinfo pqm', async () => {
    const pqm = await server.getPQM();
    expect(pqm.pcm).toBeDefined();
  });

  it('sysinfo stats', async () => {
    const stats = await server.getStats();
    expect(stats.up).toBeDefined();
  });

  it('getAllData', async () => {
    const allData = await server.getAllServerData();
    expect(allData.stats.dn).toBeDefined();
  });

  it('send', async () => {
    const statusResponse = await server.send('status');
    expect(typeof statusResponse).toBe('string');
  });
});
