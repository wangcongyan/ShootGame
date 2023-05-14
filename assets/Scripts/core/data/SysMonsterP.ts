import { SysMonsterVo } from "./vo/SysMonsterVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";
export class SysMonsterP extends SysProxy {
	static pName = 'SysMonsterP';
	get vo() { return SysMonster; }
	get dbName() { return EnumDbName.SYS_MONSTER; };
	get mainKey() { return ["MonsterID"]; };
}

export class SysMonster extends SysMonsterVo 
{
	private _dropList:any[] = null;

	public get dropList():any[]
	{
		if(this._dropList ==null)
		{
			this._dropList = JSON.parse(this.Drop);
		}
		return this._dropList;
	}
}
