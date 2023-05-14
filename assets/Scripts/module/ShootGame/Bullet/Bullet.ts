import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, PhysicsGroup, PhysicsSystem2D, RigidBody2D } from 'cc';
import { objectPool } from '../../../framework/utils/objectPool';
import { SysBullet } from '../../../core/data/SysBulletP';
import { SysBulletTemplete } from '../../../core/data/SysBulletTempleteP';
import { IEmiter } from '../Emitter/IEmiter';
import { AutoBullet } from './AutoBullet';
import { EnumPhysics } from '../../../core/enum/EnumPhysics';
import { Monster } from '../Monster/Monster';
import { Player } from '../Player/Player';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    private _rigidBody:RigidBody2D = null;
    private _colloder:Collider2D = null;

    public emiter:IEmiter ;
    onLoad() 
    {
        this._rigidBody = this.node.getComponent(RigidBody2D);
        this._colloder = this.node.getComponent(Collider2D);
        this._colloder.on(Contact2DType.BEGIN_CONTACT,this.onColliderEnter,this);
    }

    public sysBullet:SysBullet;
    public sysBulletTemplete:SysBulletTemplete;

    public radius:number;
    public setbulletData(templete:SysBulletTemplete,bullet:SysBullet)
    {
        this.sysBulletTemplete = templete;
        this.sysBullet = bullet;
    }

    private _component:Component = null;
    public startBullet(group:PhysicsGroup)
    {
        if(this._component != null)
        {
            if(this._component.name != this.sysBullet.Bullet)
            {
                this._component.destroy();
                this._component = null;
            }
        }
        var com = this.getBulletCom();
        this._component =  this.addComponent(com);
        this._colloder.group = group ;
        this._rigidBody.group = group ;
    }

    public getBulletCom()
    {
        switch(this.sysBullet.Bullet)
        {
            case "AutoBullet":
                return AutoBullet;
        }
        return null;
    }
 
    /**
     * 碰撞回收子弹
     * @param selfCollider 
     * @param otherCollider 
     * @param contact 
     */
    private onColliderEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) 
    {
        var enemyBullet = PhysicsGroup[EnumPhysics.EnemyBullet];
        var bullet = PhysicsGroup[EnumPhysics.Bullet];
        var enemy = PhysicsGroup[EnumPhysics.Monster];
        var player = PhysicsGroup[EnumPhysics.Player];
        if(otherCollider.group != bullet || otherCollider.group != enemyBullet)
        {
            if(otherCollider.group == enemy)
            {
                var monster =  otherCollider.getComponent(Monster);
                if(monster != null)
                {
                    monster.beHit(this.sysBullet.Power,this.sysBullet);
                    objectPool.instance.putObject(this.node);
                }
                return;
            }
            if(otherCollider.group == player)
            {
                var player = otherCollider.getComponent(Player);
                if(player != null)
                {
                    player.beHit(this.sysBullet.Power,this.sysBullet);
                }   
            }
            objectPool.instance.putObject(this.node);
        }
    }

    public set angle(value:number)
    {
       this._angle = this.node.angle = value;
    }

    private _angle:number ;
    public get angle():number
    {
        return this._angle;
    }

    update(deltaTime: number) 
    {
        var pos = this.node.getPosition();
        if(pos.y > 1600 || pos.y < -100)
        {
            objectPool.instance.putObject(this.node);
        }
    }

    protected onEnable(): void 
    {
        if(this._rigidBody == null || this._rigidBody.enabled == false)
        {
            console.log("bullet rigBody onEnable null   ");
        }
    }
}


