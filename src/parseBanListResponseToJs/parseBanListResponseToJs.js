// @flow
/**
 * Parses the response from the rcon command mis_banlist_status
 */
import { ParserError } from '../index';
import type { BanListResponse } from '../index';

const parseBanListResponseToJs = (res: string): BanListResponse => {
		if (!res.includes('Banned players : ')) {
			throw new ParserError('Not a Banlist');
		}
		return res
			.split('-----------------------------------------')[1]
			.replace('-----------------------------------------', '')
			.replace('-----------------------------------------', '')
			.replace(/(\r\n|\n|\r)/gm, ' ')
			.replace('Banned players : ', '')
			.split(' ')
			.filter(x => x !== 'SteamID:')
			.filter(x => x !== '');
};

export default parseBanListResponseToJs;
