/**
 * Name: tryParseResponse
 * Description: given a server response try and parse it
 * and return either the response or false if it didn't work
 */
import * as misrcon from '../node-misrcon';
import { ParseResponse } from '../types';

export default function parseResponse(response: string): ParseResponse {
  // Try to parse the banlist
  try {
    return { data: misrcon.parseBanList(response), type: 'banlist' };
  } catch (e) {
    if (!(e instanceof misrcon.ParserError)) {
      throw e;
    }
  }

  // Try to parse the whitelist
  try {
    return { data: misrcon.parseWhitelist(response), type: 'whitelist' };
  } catch (e) {
    if (!(e instanceof misrcon.ParserError)) {
      throw e;
    }
  }

  // Try to parse the status
  try {
    return { data: misrcon.parseStatus(response), type: 'status' };
  } catch (e) {
    if (!(e instanceof misrcon.ParserError)) {
      throw e;
    }
  }

  // Try to parse the sysinfo stats
  try {
    return { data: misrcon.parseSysInfoStats(response), type: 'sysinfo stats' };
  } catch (e) {
    if (!(e instanceof misrcon.ParserError)) {
      throw e;
    }
  }

  // Try to parse the sysinfo pqm
  try {
    return { data: misrcon.parseSysInfoPQM(response), type: 'sysinfo pqm' };
  } catch (e) {
    if (!(e instanceof misrcon.ParserError)) {
      throw e;
    }
  }

  // Try to parse the entity dump
  try {
    return { data: misrcon.parseEntityDump(response), type: 'entity dump' };
  } catch (e) {
    if (!(e instanceof misrcon.ParserError)) {
      throw e;
    }
  }

  // all else has failed this can not be parsed
  return false;
}
