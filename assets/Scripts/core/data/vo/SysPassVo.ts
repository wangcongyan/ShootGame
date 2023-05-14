import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysPassVo extends BaseItem {
	/** */
	PassID:number;
	/**关卡怪物数量 */
	MonsterNum:number;
	/**生成怪物时间 */
	Interval:number;
	/** */
	Enabled:number;
	static KEYS = ["PassID","MonsterNum","Interval","Enabled"];
 }
