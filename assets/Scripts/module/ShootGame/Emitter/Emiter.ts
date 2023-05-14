import { Component, _decorator,Node, UITransform, Vec3, v3 } from "cc";
import { IEmiter } from "./IEmiter";
import { objectPool } from "../../../framework/utils/objectPool";
import { DropData } from "../../../core/data/DropData";
import { SysBullet } from "../../../core/data/SysBulletP";
import { SysBulletTemplete } from "../../../core/data/SysBulletTempleteP";
import { BulletEmiter } from "./BulletEmiter";

const { ccclass, property } = _decorator;
export abstract class Emiter extends Component  implements IEmiter
{
    protected _enoughEnerge:boolean = false;

    
    public set enoughEnerge(value: boolean)
    {
        this._enoughEnerge = value;
    }

    public get enoughEnerge(): boolean
    {
        return this._enoughEnerge;
    }


    abstract get isMonster(): boolean
    private _beFollow: boolean; 
    public get beFollow(): boolean
    {
        return this._beFollow;
    }

    public set beFollow(value: boolean)
    {
        this._beFollow = value;
    }
    
    public get target(): Node
    {
        return this.node;
    }
  
    abstract get emitName():string;

    public get isDie(): boolean
    {
        return this._isDie;
    }

    abstract get zoom(): number;
    abstract get  dropData(): DropData;
    bulletList: any[];
    targetList: IEmiter[];
    
    private _canEmitBullet: boolean = true;

    public get canEmitBullet(): boolean
    {
        return this._canEmitBullet;
    }

    public set canEmitBullet(value: boolean)
    {
        this._canEmitBullet = value;
    }
    hasMonsterInArea: boolean;
    @property({type:Node})
    public  attack:Node


    protected _attackPos:Vec3;
    protected attackTransform:UITransform = null;
    private _isDie:boolean = false; 

    /**
     * 初始化
     */
    protected start(): void 
    {
        console.log(`${this.emitName} emiter start`);
        this.attackTransform = this.attack.getComponent(UITransform);
        this._attackPos = this.attack.getPosition();
      
    }   

    private _emiter:BulletEmiter = null;
    public get emiter():BulletEmiter
    {
        if(this._emiter == null)
        {
            this._emiter = new BulletEmiter();
        }
        return this._emiter;
    }

    abstract startEmit(): void 

    private tempV3:Vec3 = Vec3.ZERO;

    /**
     * 射击位置
     */
    public get startEmiterPos(): Vec3
    {
       this._attackPos =   this.attackTransform.convertToWorldSpaceAR(this.tempV3,this._attackPos);
       return this._attackPos;
    }

     /**
     * 受击逻辑 用来播放特效或音乐 计算血量
     * @param power 
     * @param target 
     */
     abstract beHit(power: number, target: any): void 
 
     dead(force: boolean): void 
     {
         objectPool.instance.putObject(this.node);
     }

     abstract getCurrentBullet(dropData?: DropData): { bulletTemplete: SysBulletTemplete; bulletData: SysBullet; } 
    }
  