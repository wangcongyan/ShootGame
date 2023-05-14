import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysBulletVo extends BaseItem {
	/** */
	BulletID:number;
	/** */
	Type:string;
	/** */
	AvatarID:string;
	/** */
	Power:number;
	/**发射声音 */
	Sound:string;
	/** */
	Bullet:string;
	/** */
	Zoom:number;
	/** */
	Duration:number;
	/** */
	CanMove:number;
	/** */
	Hit:string;
	/**子弹血量 血量为0时移除子弹 */
	Hp:number;
	/** */
	Archor:string;
	static KEYS = ["BulletID","Type","AvatarID","Power","Sound","Bullet","Zoom","Duration","CanMove","Hit","Hp","Archor"];
 }
