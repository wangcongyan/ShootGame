import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysBulletTempleteVo extends BaseItem {
	/** */
	BulletTempleteID:number;
	/** */
	StartAngle:number;
	/** */
	EndAngle:number;
	/** */
	XStep:number;
	/** */
	YStep:number;
	/** */
	Range:number;
	/** */
	Theta:number;
	/** */
	Speed:number;
	/** */
	Times:number;
	/** */
	Delay:number;
	/** */
	XOffset:number;
	/** */
	YOffset:number;
	/** */
	StartX:number;
	/** */
	StartY:number;
	/** */
	Accelerate:number;
	/** */
	Circle:number;
	static KEYS = ["BulletTempleteID","StartAngle","EndAngle","XStep","YStep","Range","Theta","Speed","Times","Delay","XOffset","YOffset","StartX","StartY","Accelerate","Circle"];
 }
