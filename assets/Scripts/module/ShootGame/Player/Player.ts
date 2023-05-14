import { _decorator, CCInteger, Collider2D, Contact2DType, EventMouse, Node, PhysicsGroup, RigidBody2D } from 'cc';
import { DropBell } from '../Drop/DropBell';
import { AppEntry } from '../../../AppEntry';
import { EnumPhysics } from '../../../core/enum/EnumPhysics';
import { DropData } from '../../../core/data/DropData';
import { SysBullet, SysBulletP } from '../../../core/data/SysBulletP';
import { SysBulletTemplete, SysBulletTempleteP } from '../../../core/data/SysBulletTempleteP';
import { SysDrop, SysDropP } from '../../../core/data/SysDropP';
import { CData } from '../../../core/CData';
import { EnumDbName } from '../../../core/enum/EnumDbName';
import { Emiter } from '../Emitter/Emiter';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Emiter 
{

    @property({type:CCInteger})
    public ID:number;

    /** 
     * 掉落信息
     */
    private _dropData:DropData;
    private _sysDrop:SysDrop = null;  
    private _sysBullet:SysBullet = null;
    private _sysBulletTemplete:SysBulletTemplete = null;
    private _colloder:Collider2D = null;

    private root:Node = null;
    private _tempDropData:DropData = null;
    public startEmit()
    {
        // this.canEmitBullet = false;
        this._dropData = new DropData([this.ID,Number.MAX_SAFE_INTEGER])
        this.emiter.start(this);
    }

    public get isMonster():boolean
    {
        return false;   
    }
    
  
    public get zoom(): number 
    {
        return this._sysDrop && this._sysDrop.Zoom || 1;
    }

    start() 
    {
        super.start();
        this._colloder = this.node.getComponent(Collider2D);
        this._colloder.on(Contact2DType.BEGIN_CONTACT,this.onColliderEnter,this);
        var root = this.root = AppEntry.instance.Root;
        root.on(Node.EventType.TOUCH_START,this.onTouchStart,this);
        root.on(Node.EventType.TOUCH_END,this.onTouchEnd,this);
        root.on(Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.startEmit();
    }


    private onTouchEnd(e:EventMouse)
    {
        this.root.off(Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }

    protected onTouchStart(e:EventMouse)
    {
        this.root.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }

    private onTouchMove(e:EventMouse)
    {
        var pos = e.getLocation();
        this.node.setPosition(pos.x,pos.y);
    }

    private _eatDrop:DropData = null;
    private onColliderEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: any)
    {
        var drop = PhysicsGroup[EnumPhysics.Drop];
        var monster = PhysicsGroup[EnumPhysics.Monster];
        if(otherCollider.group == drop)
        {
            var node = otherCollider.node.getComponent(DropBell);
            this._tempDropData = node.getDropData();
            AppEntry.instance.AddScore(node.level * 10);
        }
        if(otherCollider.group == monster)
        {
            // var node = otherCollider.node.getComponent(DropBell);
            // this._tempDropData = node.getDropData();
            // AppEntry.instance.AddScore(node.level);
            console.log("游戏结束"); 
        }
    }

    update(deltaTime: number) 
    {
        if(!this.canEmitBullet)
        {
            return;
        }
        if(this.dropData != null)
        {
            this.emiter.amitBullet(deltaTime);
        }
    }

    getCurrentBullet(dropData?: DropData): { bulletTemplete: SysBulletTemplete; bulletData: SysBullet; } 
    {
        dropData = dropData || this.dropData;
        let tempTemplete: SysBulletTemplete;
        let tempBullet: SysBullet;
        if (dropData && !dropData.hasExpired()) {
            let sysDrop: SysDrop = CData.inst.proxy<SysDropP>(EnumDbName.SYS_DROP).getItem(dropData.value);
            tempTemplete = CData.inst.proxy<SysBulletTempleteP>(EnumDbName.SYS_BULLET_TEMPLETE).getItem(sysDrop.TempleteID)
            tempBullet = CData.inst.proxy<SysBulletP>(EnumDbName.SYS_BULLET).getItem(sysDrop.BulletID)
            this._sysDrop = sysDrop;
        } 
        return { bulletTemplete: tempTemplete, bulletData: tempBullet };
    }

  
    public get emitName(): string
    {
        return "Player";
    }
   

    public get dropData(): DropData
    {
        if(this._tempDropData != null && !this._tempDropData.hasExpired())
        {
            return this._tempDropData;
        }
        return this._dropData;
    }

    beHit(power: number, target: any): void 
    {

    }
}

