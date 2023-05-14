import { SysPlayerVo } from "./vo/SysPlayerVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";
export class SysPlayerP extends SysProxy {
	static pName = 'SysPlayerP';
	get vo() { return SysPlayer; }
	get dbName() { return EnumDbName.SYS_PLAYER; };
	get mainKey() { return ["ID"]; };
}

export class SysPlayer extends SysPlayerVo {
	}
