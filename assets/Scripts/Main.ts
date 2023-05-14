import { _decorator, Component, Node,EventMouse, PhysicsSystem2D, Prefab, instantiate, EPhysics2DDrawFlags, CCBoolean, resources, director } from 'cc';
import { objectPool } from './framework/utils/objectPool';
import { AppEntry } from './AppEntry';
import { Preload } from './preload/Preload';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component 
{
    @property({ type: CCBoolean })
    public isDebug: boolean = false;

    private preload:Preload;
    
    @property({type:Prefab})
    public drop:Prefab = null;

    protected onLoad(): void 
    {
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.debugDrawFlags = this.isDebug ? EPhysics2DDrawFlags.All : EPhysics2DDrawFlags.None;
    }

    start() 
    {
        this.preload = new Preload(this.onPreloadComplete.bind(this),this.onPreLoadPregress.bind(this));
        this.preload.init();
        director.addPersistRootNode(this.node);
    }
    

    /**
     * 加载进度
     * @param index 
     * @param progress 
     */
    private onPreLoadPregress(index:number,progress:number)
    {
        
    }

    /**
     * 加载完成
     */
    private onPreloadComplete()
    {
        console.log("preload complete");
        director.loadScene("ShootGame");
        
    }
}

