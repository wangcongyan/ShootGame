import { getServerTime } from "../../framework/utils/Time";

export class DropData
{
	constructor(data?)
	{
		if(data)
		{
			this.value = data[0] ;
			this.Time  = data[1] ;
		}
	}
	public value :number = 2 ;
	public Time :number ;
	public score:number = 0 ;

	public type:DropType;
	public hasExpired():boolean
	{
		return getServerTime() > this.Time  ;
	}
	
}
export enum DropType
{
	/**金币 */
	Gold = 1,
	/**buff */
	Buff = 2,
	/**道具 */
	Item = 3,
	/**积分 */
	Score = 4,
}