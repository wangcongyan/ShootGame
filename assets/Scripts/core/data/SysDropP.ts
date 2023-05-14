import { SysDropVo } from "./vo/SysDropVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";
export class SysDropP extends SysProxy {
	static pName = 'SysDropP';
	get vo() { return SysDrop; }
	get dbName() { return EnumDbName.SYS_DROP; };
	get mainKey() { return ["DropID"]; };


}

export class SysDrop extends SysDropVo 
{

	}
