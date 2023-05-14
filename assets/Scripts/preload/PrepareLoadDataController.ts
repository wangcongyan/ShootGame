import { JsonAsset, resources } from "cc";
import { StateController } from "../core/state/StateController";
import { TextAsset } from "cc";
import { CData } from "../core/CData";
import { DataProxy } from "../core/data/DataProxy";

export class PrepareLoadDataController extends StateController
{
    private progress:Function;
    constructor(progress:Function)
    {
        super();
        this.progress = progress;
    }


    public Enter() 
    {
         resources.load<JsonAsset>("Data/Halo/d.data",this.onLoadProgress.bind(this),this.onLoadComplete.bind(this));
    }


    protected onLoadComplete(error:Error,text :JsonAsset)
    {
        console.log(text.json);
        CData.inst.InitSysDataByText(text.json);
        DataProxy.init();
        this.Exit();
    }

    protected onLoadProgress(completedCount: number, totalCount: number, item: any)
    {


    }
    
    public Exit() 
    {
        if(this.callBack != null)
        {
            this.callBack()
        }
    }

}