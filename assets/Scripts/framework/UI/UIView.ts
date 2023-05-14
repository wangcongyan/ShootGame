import { UIApp } from "./UIApp";

export class UIView
{
    /// <summary>
    /// 是否是view面板 
    /// </summary>
    public get IsView():boolean
    {
        return  true;
    }

    /**
     * 是否是全屏面板
     */
    public get IsFullWinView():boolean
    {
        return false;
    }

    public fullName:string;

    protected ViewParams():object
    {
        var param = UIApp.Inst.GetUIParams(this.fullName);
        return param;
    }

    constructor()
    {

    }

    /**
     * 显示UI
    */
    public Show():void
    {

    }


    /**
     * 隐藏UI
    */
    public Hide():void  
    {


    }
}