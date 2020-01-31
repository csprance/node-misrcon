/**
 * Name: getAllServerData
 * Created by chris on 4/30/2017.
 * Description:
 */
import parseEntityDump from '../parsers/parseEntityDump';
import sendRCONCommandToServer from '../sendRCONCommandToServer';

import { ENTITY_ENUM, ICredentials, IEntity } from '../types';

export default async function getEntityData(
  options: ICredentials,
  entity: ENTITY_ENUM
): Promise<IEntity[]> {
  try {
    // Get status response
    const entityDumpString = await sendRCONCommandToServer({
      ...options,
      command: `es_dump_entities ${entity}`
    });
    return parseEntityDump(entityDumpString);
  } catch (e) {
    throw e;
  }
}
