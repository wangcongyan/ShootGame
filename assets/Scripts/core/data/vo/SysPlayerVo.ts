import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysPlayerVo extends BaseItem {
	/** */
	ID:number;
	/** */
	DropID:number;
	/** */
	AvatarID:string;
	static KEYS = ["ID","DropID","AvatarID"];
 }
