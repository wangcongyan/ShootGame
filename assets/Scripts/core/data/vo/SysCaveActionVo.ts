import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysCaveActionVo extends BaseItem {
	/** */
	CaveId:number;
	/**怪物路径列表 */
	PathList:string;
	/**同组怪物的间隔 */
	Padding:number;
	/**单次生成怪物数量 */
	MonsterNum:number;
	/** */
	PassID:number;
	/**怪物列表 */
	MonsterList:string;
	/**类型 0、普通怪物，1、boss */
	Type:number;
	static KEYS = ["CaveId","PathList","Padding","MonsterNum","PassID","MonsterList","Type"];
 }
