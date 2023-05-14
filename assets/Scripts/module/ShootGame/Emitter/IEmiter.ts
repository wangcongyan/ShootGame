import { SysBulletTemplete } from "../../../core/data/SysBulletTempleteP";
import { SysBullet } from "../../../core/data/SysBulletP";
import { Node, Vec3 } from "cc";
import { DropData } from "../../../core/data/DropData";
import { BulletEmiter } from "./BulletEmiter";
export interface IEmiter
{   
    //开始发射起点位置
    startEmiterPos:Vec3;

    /**
     * 是否有足够的能量 释放技能
     */
    enoughEnerge:boolean ;

    /**
     * 被追踪
    */
    beFollow:boolean ;

    isMonster:boolean ;

    /**
     * 发射器容器
     * */
    target:Node;

    /** 
     * 获取当前子弹数据
    */
    getCurrentBullet(dropData?:DropData):{bulletTemplete:SysBulletTemplete,bulletData:SysBullet};


    /***
     * 发射对象
     */
    emiter:BulletEmiter;
    /**
     *当前目标发射子弹时子弹的缩放比例
    */
    zoom:number;

    /**
     * 发射器名称
     */
    emitName:string;

    /**
     *是否死亡
     */
    isDie:boolean ;

    /**
     * 被攻击
    */
    beHit(power:number,target:any ):void;

    /**
     * 掉落数据
     */
    dropData:DropData;

    /**
     * 子弹列表
    */
    bulletList:any[];

    /**
     * 目标列表
     */
    targetList:IEmiter[];

    /**
     * 死亡触发行为
     * @param force 
     */
    dead(force:boolean):void;

    startEmit():void;

    /**
     * 是否可以发射子弹 
     */
    canEmitBullet:boolean;
    /**
     * 是否有怪物在范围内
    */
    hasMonsterInArea:boolean;
}