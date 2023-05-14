import { GRoot, RelationType } from "fairygui-cc";
import { Singleton } from "../../Singleton";
import { HaloLayer } from "./HaloLayer";
export class LayerManager extends Singleton
{
    static get Inst()
    {
        return this.Instance<LayerManager>();
    }

    public  AppLayer:HaloLayer;
    public  SceneUILayer  :HaloLayer;
    public  PopLayer  :HaloLayer;
    public  TipLayer  :HaloLayer;
    public  GuideLayer  :HaloLayer;
    public  SceneLayer  :HaloLayer;

    public Init():void
    {
        this.SceneUILayer =  new HaloLayer ("SceneUILayer");
        this.AppLayer =  new HaloLayer ("AppLayer");
        this.PopLayer =  new HaloLayer ("PopLayer");
        this.TipLayer =  new HaloLayer ("TipLayer");
        this.SceneLayer =  new HaloLayer ("SceneLayer");
        this.GuideLayer =  new HaloLayer ("GuideLayer");
        GRoot.inst.addChild(this.SceneUILayer);
        GRoot.inst.addChild(this.AppLayer );
        GRoot.inst.addChild(this.PopLayer );
        GRoot.inst.addChild(this.TipLayer );
        GRoot.inst.addChild(this.SceneLayer );
        GRoot.inst.addChild(this.GuideLayer );

        this.SceneUILayer.addRelation(GRoot.inst, RelationType.Size);
        this.PopLayer.addRelation(GRoot.inst, RelationType.Size);
        
        this.AppLayer.addRelation(GRoot.inst, RelationType.Size);
        
        this.TipLayer.addRelation(GRoot.inst, RelationType.Size);
        
        this.SceneLayer.addRelation(GRoot.inst, RelationType.Size);
        
        this.GuideLayer.addRelation(GRoot.inst, RelationType.Size);
        
    }
}