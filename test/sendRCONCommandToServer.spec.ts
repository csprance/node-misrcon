/* global it, describe, before, after */
import { br1, dev, us77 } from '../secrets';
import * as misrcon from '../src/node-misrcon';

// make sure we can hit some endpoints
describe('sendRCONCommandToServer', () => {
  it('us77 status', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(us77);
    expect(typeof results).toEqual('string');
  });

  it('us77 status and parser', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(us77);
    expect(misrcon.parseStatus(results).name).toEqual(
      'Official Miscreated - i3D.net - US East #77 - Islands'
    );
  });

  it('br1 status', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(br1);
    expect(typeof results).toEqual('string');
  });

  it('Should have a bad password', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer({ ...br1, password: 'badPassword' });
    expect(results).toEqual('Incorrect Password');
  });
});

// make sure we can hit some endpoints again
describe('sendRCONCommandToServer again', () => {
  it('us77 status two', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(us77);
    expect(typeof results).toEqual('string');
  });

  it('br1 status two', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(br1);
    expect(typeof results).toEqual('string');
  });
});

// make sure we can hit some endpoints again
describe('getAllServerData', () => {
  it('us77 all data', async () => {
    expect.assertions(1);
    const res = await misrcon.getAllServerData(us77);
    expect(typeof res).toEqual('object');
  });

  it('br all data', async () => {
    expect.assertions(1);
    const res = await misrcon.getAllServerData(br1);
    expect(typeof res).toEqual('object');
  });
});
