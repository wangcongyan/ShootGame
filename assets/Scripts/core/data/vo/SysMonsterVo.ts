import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysMonsterVo extends BaseItem {
	/** */
	MonsterID:number;
	/** */
	Avatar:string;
	/** */
	Speed:number;
	/** */
	BulletID:number;
	/** */
	Hp:number;
	/** */
	IsBoss:number;
	/**掉落列表 */
	Drop:string;
	/**掉落概率 */
	Odd:number;
	static KEYS = ["MonsterID","Avatar","Speed","BulletID","Hp","IsBoss","Drop","Odd"];
 }
