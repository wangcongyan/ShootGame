import { BaseItem } from "../../../framework/data/base/BaseItem";
export class SysPathVo extends BaseItem {
	/** */
	PathID:number;
	/** */
	PathList:string;
	/** */
	BezierLen:number;
	/** */
	Circle:number;
	/** */
	Speed:number;
	/** */
	Height:number;
	/** */
	Width:number;
	/** */
	Back:number;
	/**下一条路径 */
	NextPath:number;
	static KEYS = ["PathID","PathList","BezierLen","Circle","Speed","Height","Width","Back","NextPath"];
 }
