import { Singleton } from "../Singleton";
import { UIView } from "./UIView";

export class UIApp extends Singleton
{
 
    static get Inst()
    {
        return this.Instance<UIApp>();
    }

    private _uiPool: Map<string,UIView> = new Map<string,UIView>();

    /**
     * 缓存UI面板
     */
    private _uiAppPool: Map<string,any> = new Map<string,any>();
    public GetUIParams(appName:string):object
    {
        return null;
    }

    /**
     * 根据名字显示UI
     * @param appName 
     * @param uiParams 
     * @returns 
     */
    public  ShowAppByName<T>(appName:string,uiParams:object = null):T
    {
        var appView :any=  this._uiPool.get(appName);
        var app = this._uiAppPool.get(appName);
        if(appView == null)
        {
            appView = new app();
            appView.fullName = appName;
            this._uiPool.set(appName,appView);
        }
        return appView as T;
    }

    /**
     * 显示UI
     * @param app 
     * @returns 
     */
    public ShowApp<T>(app:{new():UIView},uiParams:object):T
    {
        var className = Object.getPrototypeOf(app).constructor.name;
        this._uiAppPool.set(className,app);
        return this.ShowAppByName<T>(className,uiParams);
    }

    public HideApp<T>(app:{new ():T}):void
    {
        var className = Object.getPrototypeOf(app).constructor.name;
       this.HideAppByName(className);
    }

    /**
     * 根据名字隐藏UI
     * @param appName 
     */
    public HideAppByName(appName:string):void
    {
        var appView :any =  this._uiPool.get(appName);
        if(appView != null)
        {
            appView.Hide();
        }
    }
}