import { director, resources } from "cc";
import { StateController } from "../core/state/StateController";

export class PrepareLoadResController extends StateController
{
    private progress:Function;
    constructor(progress:Function)
    {
        super();
        this.progress = progress;
    }

    Enter() 
    {
        var self  = this;
        director.preloadScene('ShootGame', function (err, scene) 
        {
            if(err)
            {
                console.log("load scene error");
            }
            else
            {
                console.log("load scene success");
                self.loadPrefabs();
                
            }
        });
    }

    loadPrefabs()
    {
        resources.loadDir("Prefabs",this.onLoadProgress.bind(this),this.onLoadComplete.bind(this));

    }

    protected onLoadProgress()
    {

    }

    protected onLoadComplete(error:Error,text :any)
    {
        if(!error){
            this.Exit();
        }
    }

    Exit() 
    {
        this.callBack();
    }
}