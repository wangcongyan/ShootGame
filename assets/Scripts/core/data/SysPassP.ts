import { SysPassVo } from "./vo/SysPassVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";
export class SysPassP extends SysProxy {
	static pName = 'SysPassP';
	get vo() { return SysPass; }
	get dbName() { return EnumDbName.SYS_PASS; };
	get mainKey() { return ["PassID"]; };
}

export class SysPass extends SysPassVo {
	}
