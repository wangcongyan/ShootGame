import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysDropVo extends BaseItem {
	/** */
	DropID:number;
	/** */
	Time:number;
	/** */
	BulletID:number;
	/** */
	TempleteID:number;
	/** */
	AvaterID:string;
	/** */
	Zoom:number;
	/** */
	Effect:string;
	/**掉落类型 分为0：子弹掉落、1：积分道具掉落 */
	Type:number;
	static KEYS = ["DropID","Time","BulletID","TempleteID","AvaterID","Zoom","Effect","Type"];
 }
