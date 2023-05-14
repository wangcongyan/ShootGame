import { GRoot, RelationType } from "fairygui-cc";

export class HaloLayer extends GRoot
{
    private _layerName:string;
    constructor(layerName:string)
    {
        super();
        this.name = "HaloLayer";
        this.setSize(GRoot.inst.width, GRoot.inst.height);
        this.addRelation(GRoot.inst, RelationType.Size);
    }

    public set layerName(value:string)
    {
        this._layerName = value;
    }

    public get layerName():string
    {
        return this._layerName;
    }
}