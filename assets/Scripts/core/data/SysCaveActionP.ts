import { SysCaveActionVo } from "./vo/SysCaveActionVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";

export class SysCaveActionP extends SysProxy {

	static pName = 'SysCaveActionP';
	get vo() { return SysCaveAction; }
	get dbName() { return EnumDbName.SYS_CAVE_ACTION; };
	get mainKey() { return ["CaveId"]; };

	public getRandAction()
	{


	}

	private _actionMap:Map<string,SysCaveAction[]> ;
	/**
	 * 根据passID和type获取生成怪物行为
	 * @param passID 
	 * @param type 
	 */
	public getActionByType(passID:number,type:number)
	{
		this.initActionMap();
		var key = passID + "_" + type;
		var actionArr = this._actionMap.get(key);
		var index = Math.floor(Math.random() * actionArr.length);
		return actionArr[index];
	}

	private initActionMap()
	{
		if(this._actionMap == null)
		{
			this._actionMap = new Map<string,SysCaveAction[]>();	
			for(var i = 0 ; i < this.dataHash.values.length ; i ++)
			{
				var action:SysCaveAction = this.dataHash.values[i];
				var key = action.PassID + "_" + action.Type;
				var actionArr = this._actionMap.get(key);
				if(actionArr == null)
				{
					actionArr = [];
				}
				actionArr.push(action);
				if(!this._actionMap.has(key))
				{
					this._actionMap.set(key,actionArr);
				}
			}
		}
	}
}

export class SysCaveAction extends SysCaveActionVo 
{
	public get pathList():any[]
	{
		return JSON.parse(this.PathList);
	}

	public get monsterList():any[]
	{
		return JSON.parse(this.MonsterList);
	}
}
