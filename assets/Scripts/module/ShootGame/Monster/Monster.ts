import { _decorator, Prefab, resources, v3, Vec3 } from 'cc';
import { SysPath } from '../../../core/data/SysPathP';
import { SysMonster } from '../../../core/data/SysMonsterP';
import { IEmiter } from '../Emitter/IEmiter';
import { DropData } from '../../../core/data/DropData';
import { SysBullet, SysBulletP } from '../../../core/data/SysBulletP';
import { SysBulletTemplete, SysBulletTempleteP } from '../../../core/data/SysBulletTempleteP';
import { SysDrop, SysDropP } from '../../../core/data/SysDropP';
import { CData } from '../../../core/CData';
import { EnumDbName } from '../../../core/enum/EnumDbName';
import { objectPool } from '../../../framework/utils/objectPool';
import { MonsterMove } from './MonsterMove';
import { AppEntry } from '../../../AppEntry';
import { Emiter } from '../Emitter/Emiter';
import { DropType } from '../../../core/data/DropData';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Emiter implements IEmiter
{
    private _sysDrop:SysDrop = null;  
    private _sysBullet:SysBullet = null;
    private _sysBulletTemplete:SysBulletTemplete = null;

    private _hp:number ;

    public sysPath:SysPath;
    public sysMonster:SysMonster;


    /**
     * 0-1 通过比例获取在贝塞尔曲线上的位置
     */
    public startTime:number = 0;

    public get isMonster():boolean
    {
        return true;   
    }

    public get zoom(): number 
    {
        return 1;
    }

    public get startEmiterPos(): Vec3
    {
       this._attackPos =   this.attackTransform.convertToWorldSpaceAR(v3(0,0,0),this._attackPos);
       return this._attackPos;
    }

    /** 
     * 默认子弹
     */
    private _dropData:DropData;

    public get dropData(): DropData
    {
        return this._dropData;
    }

    /**
     * 初始化怪物信息
     * @param sysMonster 
     * @param sysPath 
     * @param time 
     * @param type 
     */
    public initMonster(sysMonster:SysMonster,sysPath:SysPath,time:number,type:number):void
    {
        this.sysMonster = sysMonster;
        this.sysPath = sysPath; 
        this.startTime = time;

        //初始化子弹
        this._dropData = new DropData();
        this._dropData.Time = Number.MAX_SAFE_INTEGER;
        this._dropData.type = DropType.Buff;
        this._dropData.value = this.sysMonster.BulletID;
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

    public startEmit()
    {
        console.log("monster startEmit");
        this._dropData = new DropData([this.sysMonster.BulletID,Number.MAX_SAFE_INTEGER])
        this._hp = this.sysMonster.Hp;
        this.emiter.start(this);
        if(!this.getComponent(MonsterMove))
        {
            this.addComponent(MonsterMove);
        }
    }

    protected update(dt: number): void 
    {
        if(this._dropData != null)
        {
            this.emiter.amitBullet(dt);
        }
        var pos = this.node.position;
        if(pos.x > 905)
        {
            console.log("123123");
        }
    }

    public get emitName(): string
    {
        return "Monster";
    }

    public get isDie(): boolean
    {
        return this._hp <= 0;
    }

    /**
     * 受击处理
     * @param power 
     * @param target 
     */
    beHit(power: number, target: any = null): void 
    {
        this._hp -= power;
        if(this._hp <= 0)
        {
            this.dead(false);
       
        }
    }
       

    dead(force: boolean): void 
    {
        this.createDrop(force);
        if(this._hp <= 0 || force)
        {
            objectPool.instance.putObject(this.node);
            AppEntry.instance.killMonster(this.sysMonster.IsBoss);
        }
    }

    /**
     * 创建掉落物
     * @param force 
     * @returns 
     */
    private createDrop(force:boolean):void
    {
        if(force)return ;
        var random = Math.random();
        var dropList = this.sysMonster.dropList;
        var length = dropList.length;
        if(random < this.sysMonster.Odd && length> 0)
        {
            var randIndex = Math.floor(Math.random() * length);
            var dropID = this.sysMonster.dropList[randIndex];
            var sysDrop :SysDrop = CData.inst.proxy<SysDropP>(EnumDbName.SYS_DROP).getItem(dropID);
            var drop:Prefab = resources.get<Prefab>(`Prefabs/${sysDrop.AvaterID}`,Prefab);
            var dropNode = objectPool.instance.getObject(drop);
            dropNode.setPosition(this.node.position);
            var root = this.node.parent ;
            this.scheduleOnce(()=>
            {
                dropNode.parent = root ;
            },0.02);
        }
    }

    protected onEnable(): void 
    {
        this.canEmitBullet = true;
    }
}