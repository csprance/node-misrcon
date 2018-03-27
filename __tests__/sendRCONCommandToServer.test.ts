/* global it, describe, before, after */
import { br1, dev, us77 } from '../secrets';
import misrcon from '../src/index';

// make sure we can hit some endpoints
describe('sendRCONCommandToServer', () => {
  it('us77 status', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(us77);
    expect(typeof results).toEqual('string');
  });

  it('dev status and parser', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(dev);
    expect(misrcon.parseStatusResponseToJs(results).name).toEqual('Dev Server');
  });

  it('br1 status', async () => {
    expect.assertions(1);
    const results = await misrcon.sendRCONCommandToServer(br1);
    expect(typeof results).toEqual('string');
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
