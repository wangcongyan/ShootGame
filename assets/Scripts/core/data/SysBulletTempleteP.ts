import { SysBulletTempleteVo } from "./vo/SysBulletTempleteVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";
export class SysBulletTempleteP extends SysProxy {
	static pName = 'SysBulletTempleteP';
	get vo() { return SysBulletTemplete; }
	get dbName() { return EnumDbName.SYS_BULLET_TEMPLETE; };
	get mainKey() { return ["BulletTempleteID"]; };
}

export class SysBulletTemplete extends SysBulletTempleteVo 
{
	private _addRange:number = 0 ;
	public get addRange():number
	{
		if(!this._addRange)
		{
			this._addRange = Math.sqrt( this.XStep * this.XStep + this.YStep*this.YStep);
		}
		return this._addRange;
	}

	public get isCircle():boolean
	{
		return this.Circle == 1;
	}
}
