import { Prefab ,Node, NodePool, instantiate, Layers} from "cc";

export class objectPool
{

    private static _instance:objectPool = null;

    public static get instance():objectPool
    {
        if(this._instance == null)
        {
            this._instance = new objectPool();
        }
        return this._instance;
    }

    private _poolDic:Map<string,NodePool> = new Map<string,NodePool>();
    public getObject(prefab :Prefab):Node
    {
        var node:Node = null; 
        if(prefab == null)
        return null;
        var poolName = prefab.data.name;
        let pool = this._poolDic.get(poolName);
        if(pool == null)
        {
            pool = new NodePool(poolName);
            this._poolDic.set(poolName,pool);
        }
        if(pool.size() > 0)
        {
            return pool.get();
        }
        node = instantiate(prefab);
        node.layer = Layers.Enum.UI_2D;
        return node;
    }

    public putObject(node:Node)
    {
        var name = node.name;
        let pool = this._poolDic.get(name);
        if(pool == null)return;
        pool.put(node);
    }

}