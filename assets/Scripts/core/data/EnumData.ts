import { EnumDbName } from "../enum/EnumDbName";
import { ServerP } from "./ServerP";
import { SysBulletP } from "./SysBulletP";
import { SysBulletTempleteP } from "./SysBulletTempleteP";
import { SysMonsterP } from "./SysMonsterP";
import { SysPassP } from "./SysPassP";
import { SysDropP } from "./SysDropP";
import { SysPlayerP } from "./SysPlayerP";
import { SysPathP } from "./SysPathP";
import { SysCaveActionP } from "./SysCaveActionP";

export class EnumData
{
	public dataHash:any = null;
	public init(dataHash:any):void
	{
		this.dataHash = dataHash;
		this.dataHash[EnumDbName.SERVER] = ServerP;
			this.dataHash[EnumDbName.SYS_BULLET] = SysBulletP;
		this.dataHash[EnumDbName.SYS_BULLET_TEMPLETE] = SysBulletTempleteP;
		this.dataHash[EnumDbName.SYS_MONSTER] = SysMonsterP;
		this.dataHash[EnumDbName.SYS_PASS] = SysPassP;
		this.dataHash[EnumDbName.SYS_DROP] = SysDropP;
		this.dataHash[EnumDbName.SYS_PLAYER] = SysPlayerP;
		this.dataHash[EnumDbName.SYS_PATH] = SysPathP;
		this.dataHash[EnumDbName.SYS_CAVE_ACTION] = SysCaveActionP;

	}
}