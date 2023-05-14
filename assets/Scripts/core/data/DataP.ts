import { SysBulletP } from "./SysBulletP";
import { SysBulletTempleteP } from "./SysBulletTempleteP";
import { SysMonsterP } from "./SysMonsterP";
import { SysPassP } from "./SysPassP";
import { SysDropP } from "./SysDropP";
import { SysPlayerP } from "./SysPlayerP";
import { SysPathP } from "./SysPathP";
import { SysCaveActionP } from "./SysCaveActionP";
import { EnumDbName } from "../enum/EnumDbName"
import { CData } from "../CData";

export class DataP
{
	static get SysBulletP():SysBulletP 
	{
		return CData.inst.proxy<SysBulletP>(EnumDbName.SYS_BULLET);
	}
	static get SysBulletTempleteP():SysBulletTempleteP 
	{
		return CData.inst.proxy<SysBulletTempleteP>(EnumDbName.SYS_BULLET_TEMPLETE);
	}
	static get SysMonsterP():SysMonsterP 
	{
		return CData.inst.proxy<SysMonsterP>(EnumDbName.SYS_MONSTER);
	}
	static get SysPassP():SysPassP 
	{
		return CData.inst.proxy<SysPassP>(EnumDbName.SYS_PASS);
	}
	static get SysDropP():SysDropP 
	{
		return CData.inst.proxy<SysDropP>(EnumDbName.SYS_DROP);
	}
	static get SysPlayerP():SysPlayerP 
	{
		return CData.inst.proxy<SysPlayerP>(EnumDbName.SYS_PLAYER);
	}
	static get SysPathP():SysPathP 
	{
		return CData.inst.proxy<SysPathP>(EnumDbName.SYS_PATH);
	}
	static get SysCaveActionP():SysCaveActionP 
	{
		return CData.inst.proxy<SysCaveActionP>(EnumDbName.SYS_CAVE_ACTION);
	}

}