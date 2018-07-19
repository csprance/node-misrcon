/**
 * Name: utils
 * Created by chris on 4/30/2017.
 * Description:
 */
import { AxiosResponse } from 'axios';
import * as crypto from 'crypto';
import { parseString } from 'xml2js';

const md5 = (contents: string) =>
  crypto
    .createHash('md5')
    .update(contents)
    .digest('hex');

export function createChallengeString(): string {
  return '<methodCall><methodName>challenge</methodName><params></params></methodCall>';
}

export function createChallengeResponseString(upTime: string, password: string): string {
  // by doing md5(uptime:password)
  return `<methodCall><methodName>authenticate</methodName><params><param><value><string>${md5(
    `${upTime}:${password}`
  )}</string></value></param></params></methodCall>`;
}

export function createCommandString(command: string): string {
  return `<methodCall><methodName>${command}</methodName><params></params></methodCall>`;
}

export function getUpTimeFromChallengeResponse(str: string): string {
  // server response looks like
  // <methodResponse><params><param><value><string>31268616.000000</string></value></param></params></methodResponse>
  // get the uptime by parsing the xml
  let upTime = '';
  parseString(str, (err, result) => {
    if (!err) upTime = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return upTime;
}

export function parseCommandResponse(str: string): string {
  // server response looks like
  // <methodResponse><params><param><value><string>{server response}</string></value></param></params></methodResponse>
  let res = '';
  parseString(str, (err, result) => {
    // parse the response
    if (!err) res = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return res;
}

export function parseAuthResponse(data: string): string {
  // server response looks like this
  // <?xml version='1.0'?>
  // <methodResponse>
  // <params><param><value><string>authorized</string></value></param></params>
  // </methodResponse>
  // sometimes auth passes after a few tries it just keeps the connection open
  // Handle auth failed here
  // TODO: Probably could look into this a little further
  let authResults = '';
  parseString(data, (err, result) => {
    if (!err) authResults = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return authResults;
}

export function isIllegalCommand(res: AxiosResponse): Boolean {
  // server response looks like
  // <methodResponse><params><param><value>
  // <string> [Whitelist] Invalid command: challenge</string></value></param></params>
  // </methodResponse>
  // find out if it says Illegal Command
  let responseString = '';
  const commandRegex = new RegExp(/\[Whitelist] Invalid command: .*/g);
  parseString(res.data, (err, result) => {
    if (!err) {
      responseString = result.methodResponse.params[0].param[0].value[0].string[0];
    }
  });
  return commandRegex.exec(responseString) !== null;
}

const preserveCamelCase = (input: string) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
      input = input.slice(0, i) + '-' + input.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      /[a-zA-Z]/.test(c) &&
      c.toLowerCase() === c
    ) {
      input = input.slice(0, i - 1) + '-' + input.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = c.toLowerCase() === c;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = c.toUpperCase() === c;
    }
  }

  return input;
};

export const camelCase = (input: string, options?: any) => {
  options = Object.assign(
    {
      pascalCase: false
    },
    options
  );

  const postProcess = (x: any) => (options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x);

  if (Array.isArray(input)) {
    input = input
      .map(x => x.trim())
      .filter(x => x.length)
      .join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
  }

  if (/^[a-z\d]+$/.test(input)) {
    return postProcess(input);
  }

  const hasUpperCase = input !== input.toLowerCase();

  if (hasUpperCase) {
    input = preserveCamelCase(input);
  }

  input = input
    .replace(/^[_.\- ]+/, '')
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());

  return postProcess(input);
};
