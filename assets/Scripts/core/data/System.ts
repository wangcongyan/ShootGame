
export class System 
{
    public  static systemTime: number = 0;
    public static systemTimeTag: number;
    private static _timeZone:number ;
    private static _resetTime:number ;
    private static _Isdst:boolean ;
    private static _crossRoleID:number ;
    private static _timeZoneOffset:number;
    private static _crossID:number ;
    private static _plat:string;
    private static _startTime:number;
    static setSystemTime(val: any,timeZone?:number,crossID?:number,plat?:string,startTime:number = 0,resetTime:number = 0,Isdst?:boolean) 
    {
        System.systemTime = val ;
        var gmtOffset=  timeZone;
        System._timeZone =  gmtOffset * 3600;
        System.systemTimeTag = Date.now();
        System._resetTime = resetTime ;
        System._startTime = startTime ;
        System._Isdst = Isdst ;
        System._timeZoneOffset = new Date().getTimezoneOffset();
        System._crossID = crossID;
        System._plat = plat;
    }

    public static get timeZoneOffset():number
    {
        return System._timeZoneOffset;
    }

    public static get plat():string
    {
        return System._plat;
    }

    public static get startTime():number
    {
        return System._startTime;
    }
    
    public static get timeZone():number
    {
        if(System.Isdst)
        {
            return System._timeZone/3600 + 1 ;
        }
        return  System._timeZone/3600
    }

    public static get resetTime():number
    {
        return System._resetTime ;
    }
    
    public static get crossRoleID():number
    {
        return System._crossRoleID ;
    }

    public static get crossID():number
    {
        return System._crossID ;
    }

    public static set resetTime(value:number)
    {
        System._resetTime  = value;
    }

    /**
     * 是否是夏令时
     */
    public static get Isdst():boolean
    {
        return System._Isdst ;
    }
    
    public static set Isdst(value:boolean)
    {
        System._Isdst  = value;
    }
}