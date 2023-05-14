import { UIView } from "./UIView";

export class UIWin extends UIView
{
      /// <summary>
    /// 是否是view面板 
    /// </summary>
    public get IsView():boolean
    {
        return  true;
    }

}