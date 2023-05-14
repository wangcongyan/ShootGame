
import { IEmiter } from "./IEmiter";
import { SysBullet } from "../../../core/data/SysBulletP";
import { SysBulletTemplete } from "../../../core/data/SysBulletTempleteP";
import { Player } from "../Player/Player";
import { Bullet } from "../Bullet/Bullet";
import { UITransform, Vec2 ,Node, Vec3, Prefab, resources, PhysicsGroup} from "cc";
import { objectPool } from "../../../framework/utils/objectPool";
import { EnumPhysics } from "../../../core/enum/EnumPhysics";
/**
 * @usage子弹发射器
 * */
export class BulletEmiter
{
    public owner: IEmiter;
    public bulletPosition: Vec2[];
    public type: number;
    private _currentBulletTemplete: SysBulletTemplete;
    private _currentBulletData: SysBullet;
    private _currentPassedTime: number = 0;
    private isPause: boolean = false;

    private uiTransform:UITransform = null;
    /**
     * 发射器容器
     */
    private target: Node;
    /** 
     * 发射器根节点
     */
    private root:Node
    constructor() 
    {
    }   

    public stop(): void 
    {
        this.isPause = true;
    }


    public resume(): void 
    {
        this.isPause = false;
    }

    private groud:PhysicsGroup;
    public start(owner: IEmiter, type: number = 0): void 
    {
        this.owner = owner;
        this.type = type;
        this.isPause = false;
        this.target = owner.target ;
        this.root = this.target.parent ;
        this.uiTransform = this.target.getComponent(UITransform);

        this.groud = this.owner.isMonster ? PhysicsGroup[EnumPhysics.EnemyBullet]: PhysicsGroup[EnumPhysics.Bullet];

        let bulletInfo,  dropData = this.owner.dropData;;
        if (dropData && dropData.hasExpired()) 
        {
            dropData = null;
        }
        bulletInfo = this.owner.getCurrentBullet(dropData)
        this._currentBulletTemplete = bulletInfo.bulletTemplete;
        this._currentBulletData = bulletInfo.bulletData;
        this._currentPassedTime = this._currentBulletTemplete.Delay;
    }

    private _bulletPrefab:Prefab = null;
    private _isLoadBulletComplete:boolean = false;
    private loadBullet():void
    {
      
        if(this._bulletPrefab&&  this._bulletPrefab.name == this._currentBulletData.AvatarID)
        {
            this._isLoadBulletComplete = true;
            return ;
        }
        var url:string = `Prefabs/Bullets/${this._currentBulletData.AvatarID}`;
        resources.load(url,Prefab,this.onLoadPrefabComplete.bind(this));
    }

    private onLoadPrefabComplete(error:Error, prefab:Prefab):void
    {
        if(error)
        {
            throw new Error("加载子弹预制体失败" + error.message);
        }
        this._bulletPrefab = prefab;
        this._isLoadBulletComplete = true;
    }

    public amitBullet(updateTime:number): void 
    {
        this.loadBullet();
        if (this.isPause || this._isLoadBulletComplete == false) 
        {
            return;
        }
        var currentTime = this._currentPassedTime ;
        this._currentPassedTime += updateTime*1000;
        if (this._currentBulletTemplete && currentTime < this._currentBulletTemplete.Delay)
        {
           return;
        }
    
        let emiter = this.owner;
        let target = this.target;
        if (!emiter) {
            return;
        }
     
        if(this.type == 2)
        {
            // let hasMonster = (this.owner as ElfBall).hasMonsterInArea;
            // if(hasMonster == false)return;
        }
        let temp = emiter.startEmiterPos;
        var worldPos:Vec3 =  this.uiTransform.convertToWorldSpaceAR(temp, worldPos);
        // = this.target.getComponent<UITransform>();

        this._currentPassedTime = 0;
        if (this.type == 0) {
            let hasMonster = (this.owner as IEmiter).hasMonsterInArea;
            this.playEmitEffect();
        }
        this.startLaunchBullet(temp);
    }

    /**
     * 播放发射特效
     */
    protected playEmitEffect():void
    {


    }

    private lastIndex: number = 0;
    private lastTemplete: SysBulletTemplete;
    private tempPosition: Vec3 = Vec3.ZERO;
    public startLaunchBullet(position: Vec3): void 
    {
        if (this.owner.isDie) return;
        var bulletTemplete = this._currentBulletTemplete;
        var bulletData = this._currentBulletData;
        let bullet: Bullet;
        let endIndex = Math.ceil((bulletTemplete.EndAngle - bulletTemplete.StartAngle) / bulletTemplete.Theta);
        var startEmiterPos = this.owner.startEmiterPos ||this.tempPosition;
        for (let i = 0; i < bulletTemplete.Times; i++) {
            for (let j = 0; j < endIndex; j++) {
                var bulletNode = objectPool.instance.getObject(this._bulletPrefab);
                bullet = bulletNode.getComponent(Bullet);
                var angle  = (bulletTemplete.StartAngle + j * bulletTemplete.Theta) / 180 * Math.PI;
                bullet.angle = angle;
                bullet.setbulletData(bulletTemplete, this._currentBulletData);
                bullet.emiter = this.owner;
                
                var scale = this.owner.zoom * this._currentBulletData.Zoom;
                bullet.node.setScale(new Vec3(scale,scale,scale));
                if (bulletData.Type == 'L') {
                    this.target.addChild(bulletNode);
                    var x =  startEmiterPos.x - 10;
                    bulletNode.setPosition(x, startEmiterPos.y);
                } else {
                    bulletNode.parent = this.root;
                    var x:number,y:number;
                    if(bulletTemplete.isCircle)
                    {   
                        var radius = i * bulletTemplete.addRange + bulletTemplete.Range;
                        x = position.x + radius * Math.cos(angle);
                        y = position.y + radius * Math.sin(angle);  
                        bullet.radius = radius;
                    }else
                    {
                        var radius = i * bulletTemplete.addRange;
                        x = position.x + bulletTemplete.StartX + bulletTemplete.XOffset * i + radius * Math.cos(bullet.angle);
                        y = position.y + bulletTemplete.StartY + bulletTemplete.YOffset * i + radius * Math.sin(bullet.angle);
                    }
                
                    bulletNode.setPosition(x, y);
                }
                if(bullet) bullet.startBullet(this.groud);
            }
        }
        this.lastTemplete = bulletTemplete;
        
    }

    public dispose(): void 
    {
        
    }

}