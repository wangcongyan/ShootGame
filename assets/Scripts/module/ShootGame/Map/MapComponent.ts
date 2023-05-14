import { _decorator, Component, Game, Layers, Node, Prefab, Rect, screen, Size, UITransform, view } from 'cc';
import { MapLevel } from './MapLevel';
import { objectPool } from '../../../framework/utils/objectPool';
import { AppEntry } from '../../../AppEntry';
const { ccclass, property } = _decorator;

@ccclass('MapComponent')
export class MapComponent extends Component 
{
    @property({type:Prefab})
    public defaultMapLevel1:Prefab = null;

    @property({type:Prefab})
    public defaultMapLevel2:Prefab = null;

    private _mapLevel1:MapLevel = null;
    private _mapLevel2:MapLevel = null;

    private _mapLevelContent1:Node = null;
    private _mapLevelContent2:Node = null;
    private _quickMode:boolean = false;

    public viewPort:Size = null;

    private mapSize:UITransform;

    start() 
    {
        this.viewPort =  screen.windowSize;
        console.log("viewPort" + this.viewPort)
    }    

    update(deltaTime: number) {
        this.onUpdateMap();
    }

    onUpdateMap(): void
   {
        if(this._mapLevel1 == null && this._mapLevel2 == null)
        {
            this._mapLevelContent1 = objectPool.instance.getObject(this.defaultMapLevel1);
            this._mapLevelContent2 = objectPool.instance.getObject(this.defaultMapLevel2);
            this._mapLevelContent1.layer = Layers.Enum.UI_2D;
            this._mapLevelContent2.layer = Layers.Enum.UI_2D;
            this._mapLevel1 = this._mapLevelContent1.getComponent(MapLevel);
            this._mapLevel2 = this._mapLevelContent1.getComponent(MapLevel);
            this.node.addChild(this._mapLevelContent1);
            this.node.addChild(this._mapLevelContent2);
            var size = this.mapSize  = this._mapLevelContent1.getComponent(UITransform);
            var offsetX =  this.viewPort.width - size.width >> 1;
            this._mapLevelContent2.setPosition(offsetX, size.height);
            this._mapLevelContent1.setPosition(offsetX, 0);
        }
        this.MoveAction();
   }

   private ClearMap()
   {
         if(this._mapLevelContent1 != null)
         {
             this._mapLevelContent1.removeFromParent();
             this._mapLevelContent1 = null;
         }
         if(this._mapLevelContent2 != null)
         {
             this._mapLevelContent2.removeFromParent();
             this._mapLevelContent2 = null;
         }
   }

    
    /**移动 */
    private MoveAction(): void 
    {
        if (AppEntry.instance.isPause ) return;

        let com1 = this._mapLevelContent1 ;
        let com2 = this._mapLevelContent2 ;
        let speed =  this._mapLevel1.Speed ;
        let quickMode = this._quickMode;
        speed = quickMode ? speed + 7:speed;
        var height = this.viewPort.height;
        var size = this.mapSize;
        var pos1 = com1.position;
        var pos2 = com2.position;
        if (com1 && com2) {
            var posy1 = pos1.y - speed;
            var posy2 = pos2.y - speed;
            com2.setPosition(pos2.x,posy2);
            if ( posy1 <  0) {
                posy1 = posy2 + size.height;
            }
            com1.setPosition(pos1.x, posy1);
            if (posy2 <  0) {
                posy2 = posy1 + size.height;
            }
            com2.setPosition(pos2.x, posy2);
        }
    }
}

