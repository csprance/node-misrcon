/**
 * Parses the response from the rcon command mis_whitelist_status
 */
import { ParserError } from '../index';
import { WhiteListResponse } from '../index';

const parseWhitelistResponseToJs = (res: string): WhiteListResponse => {
	if (!res.includes('Whitelisted players : ')) {
		throw new ParserError('Not a whitelist');
	}
	return res
		.split('-----------------------------------------')[1]
		.replace('-----------------------------------------', '')
		.replace('-----------------------------------------', '')
		.replace(/(\r\n|\n|\r)/gm, ' ')
		.replace('Whitelisted players : ', '')
		.split(' ')
		.filter(x => x !== 'SteamID:')
		.filter(x => x !== '0')
		.filter(x => x !== '');
};

export default parseWhitelistResponseToJs;
