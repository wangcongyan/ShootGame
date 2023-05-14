import { EnumDbName } from "../enum/EnumDbName";
import { SysProxy } from "./libs/SysProxy";
import { SysBulletVo } from "./vo/SysBulletVo";
export class SysBulletP extends SysProxy {
	static pName = 'SysBulletP';
	get vo() { return SysBullet; }
	get dbName() { return EnumDbName.SYS_BULLET; };
	get mainKey():string[] { return ["BulletID"]; };
}

export class SysBullet extends SysBulletVo 
{
	private _width:number = 0;
	private _height:number = 0;
	private _povitY:number = 0;
	private _povitX:number = 0;

	public  get width():number
	{
		if(this._width == 0)
		{
			this.initArchor();
		}
		return this._width	;
	}

	public get height():number
	{
		if(this._height == 0)
		{
			this.initArchor();
		}
		return this._height;
	}

	public get povitX():number
	{
		if(this._height == 0)
		{
			this.initArchor();
		}
		return this._povitX;
	}
	public get povitY():number
	{
		if(this._height == 0)
		{
			this.initArchor();
		}
		return this._povitY;
	}

	private initArchor() 
	{
		let archor = this.Archor.split(',');
		this._width = parseFloat(archor[0]);
		this._height = parseFloat(archor[1]);
		this._povitX = parseFloat(archor[2]);
		this._povitY = parseFloat(archor[3]);
	}
}
