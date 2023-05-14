import { SysPathVo } from "./vo/SysPathVo";
import { EnumDbName } from "../enum/EnumDbName"
import { SysProxy } from "./libs/SysProxy";
import { Vec2, Vec3, v2, v3 } from "cc";

export class SysPathP extends SysProxy {
	static pName = 'SysPathP';
	get vo() { return SysPath; }
	get dbName() { return EnumDbName.SYS_PATH; };
	get mainKey() { return ["PathID"]; };
}

export class SysPath extends SysPathVo 
{
	private _path:any[] = null;
	private _startPoint:Vec3 ;
	public get paths():any[]
	{
		if(this._path == null)
		{
			this._path = JSON.parse(this.PathList);
		}
		return this._path;
	}
	
	public get startPoint():Vec3
	{
		if(this._startPoint == null)
		{
			this._startPoint = v3(this.paths[0].x ,this.paths[0].y + 100,0) ;
		}
		return this._startPoint;
	}
}
