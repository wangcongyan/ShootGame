import { Collider2D, Component, Contact2DType, IPhysics2DContact, PhysicsGroup, RigidBody2D, Vec2, _decorator } from 'cc';
import { EnumPhysics } from '../../../core/enum/EnumPhysics';
import { objectPool } from '../../../framework/utils/objectPool';
import { DropData, DropType } from '../../../core/data/DropData';
const { ccclass, property } = _decorator;

@ccclass('DropBell')
export class Drop extends Component
{   
    /**刚体对象引用 */
    protected _rig: RigidBody2D;
    protected _collider2D:Collider2D;


    protected start(): void {
        
        this._rig = this.node.getComponent(RigidBody2D);
        this._collider2D = this.node.getComponent(Collider2D);
        this._collider2D.on(Contact2DType.BEGIN_CONTACT, this.onColliderEnter, this);
    }

    protected onColliderEnter(selfCollider: Collider2D, otherCollider: Collider2D,contact: IPhysics2DContact | null) 
    {
        var speed = this._rig.linearVelocity;
        var defaultGroup = PhysicsGroup[EnumPhysics.Default];
        var player = PhysicsGroup[EnumPhysics.Player];
        if(otherCollider.group == player ||otherCollider.group == defaultGroup)
        {
            objectPool.instance.putObject(this.node);
        }
    }

    public getDropData():DropData
    {
       var dropData:DropData = new DropData();
       dropData.value = 1;
       dropData.type = DropType.Buff;
       dropData.Time = 10 + new Date().getTime()/1000;
       return dropData;
    }
}