// @flow
/**
 * Parses the response from the rcon command mis_banlist_status
 */
import type { BanListResponse } from '../types';

const parseBanListResponseToJs = (res: string): BanListResponse => {
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
