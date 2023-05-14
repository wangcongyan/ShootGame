import { _decorator, CCFloat, Collider2D, Component, Contact2DType, Game, IPhysics2DContact, Layers, Node, PhysicsSystem2D, Prefab, Rect, RigidBody2D, Sprite, UITransform, Vec2, Vec3, view, director, Animation } from 'cc';
import { PhysicsGroup } from 'cc';
import { EnumPhysics } from '../../../core/enum/EnumPhysics';
import { Drop } from './Drop';
import { DropData, DropType } from '../../../core/data/DropData';
import { AppEntry } from '../../../AppEntry';
import { objectPool } from '../../../framework/utils/objectPool';
const { ccclass, property } = _decorator;

@ccclass('DropBell')
export class DropBell extends Drop 
{
    @property({ type: CCFloat })
    /**盒子等级 */
    level: number = 1;

    @property({ type: Sprite})
    public sprite:Sprite = null;
    private maxScore: number = 14;

    private hitTime:number  = 0 ;
    private maxSpeed: number = 5;
    private SPEED_DEFAULT = 2;
    private speedY = 2;

    private animation:Animation ;

    protected start(): void {
        
        super.start();
        this.animation = this.getComponentInChildren(Animation);
        this.speedY = this.SPEED_DEFAULT ;
    }

    private _rotation : number = 0 ;
    protected update(dt: number): void {
        
        this._rotation ++ ;
        this.sprite.node.angle = this._rotation;
        var pos = this.node.position;
        var speed = this._rig.linearVelocity;
        if(speed.y < -10)
        {
            this.speedY = this.SPEED_DEFAULT ; 
        }
        console.log(pos.y);
        if(pos.y < -50)
        {
            objectPool.instance.putObject(this.node);
        }
    }

    protected onColliderEnter(selfCollider: Collider2D, otherCollider: Collider2D,contact: IPhysics2DContact | null) 
    {
        super.onColliderEnter(selfCollider,otherCollider,contact);
        var speed = this._rig.linearVelocity;
        var bullet = PhysicsGroup[EnumPhysics.Bullet];
        if(otherCollider.group == bullet)
        {
            if(speed.y < 2 || speed.y < 0)
            {
                var bellCenter:Vec2 = this._rig.getWorldCenter(bellCenter);
                this.speedY = Math.min(this.speedY,this.maxSpeed);
                this._rig.linearVelocity = new Vec2(0,this.speedY);
                this.speedY ++ ;
                this.hitTime++ ;
                this.playHitAnimation();
            }
        }
    }

    private playHitAnimation()
    {
        if(this.hitTime > 10  &&  this.hitTime < 20)  
        {
            this.animation?.play("red");
        }else if(this.hitTime > 20)
        {
            this.animation?.play("blue");
        }
    }

    /**
     * 获取掉落数据
     * @returns 
     */
    public getDropData():DropData
    {
       var dropData:DropData = new DropData();
       dropData.type = DropType.Score;
       dropData.value = 1;
       dropData.Time = 10 + new Date().getTime()/1000;
       return dropData;
    }
    
}