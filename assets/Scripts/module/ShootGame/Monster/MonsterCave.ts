import { _decorator, Component, Node, Prefab, resources } from 'cc';
import { AppEntry } from '../../../AppEntry';
import { SysCaveAction, SysCaveActionP } from '../../../core/data/SysCaveActionP';
import { SysPass, SysPassP } from '../../../core/data/SysPassP';
import { CData } from '../../../core/CData';
import { EnumDbName } from '../../../core/enum/EnumDbName';
import { SysMonster, SysMonsterP } from '../../../core/data/SysMonsterP';
import { objectPool } from '../../../framework/utils/objectPool';
import { Monster } from './Monster';
import { SysPath, SysPathP } from '../../../core/data/SysPathP';
const { ccclass, property } = _decorator;

@ccclass('MonsterCave')
export class MonsterCave extends Component 
{

    start() 
    {

    }

    private _lastGenerateTime:number  = 0 ;
    update(deltaTime: number) 
    {
        if(AppEntry.instance.isPause)return;
        var isBossDie =AppEntry.instance.isBoosDie ;
        var monsterNum = AppEntry.instance.KillMonsterNum;
        if(isBossDie)
        {
            AppEntry.instance.clear();
            this._lastGenerateTime = 0 ;
            this.MoveToPass(2);
            return ;
        }
        if(this._sysCurrentAction == null)return;
        if(this._loadingResComplete == false)return;
        if(this._lastGenerateTime == 0 || this._lastGenerateTime>this._sysPass.Interval)
        {
            if(monsterNum >= this._sysPass.MonsterNum)
            {
                this._sysCurrentAction = CData.inst.proxy<SysCaveActionP>(EnumDbName.SYS_CAVE_ACTION).getActionByType(this._passID,1);
            }
            if(!isBossDie)
            {
                this.generateMonster();
            }
            if(this._sysCurrentAction.Type == 1) //boss只生成一次
            {
                this._sysCurrentAction = null; 
            }
            this._lastGenerateTime = 0  ;
        }
        this._lastGenerateTime += deltaTime ;
    }

    private _passID:number = 0 ;
    private _sysPass:SysPass = null ;
    private _sysCurrentAction:SysCaveAction = null ;
    private _loadingResComplete:boolean = false ;

    private root:Node = null ;
    /**
     * 进入关卡
     */
    public MoveToPass(passID:number):void
    {
        this._sysPass = CData.inst.proxy<SysPassP>(EnumDbName.SYS_PASS).getItem(passID) as SysPass ;
        if(!this._sysPass||!this._sysPass.Enabled)
        {
            console.log("关卡不存在,游戏结束");
            return ;
        }
        this._sysCurrentAction = CData.inst.proxy<SysCaveActionP>(EnumDbName.SYS_CAVE_ACTION).getActionByType(passID,0) as SysCaveAction ;
        var resArr = [];
        this._loadingResComplete = false;
        for(var i = 0 ; i < this._sysCurrentAction.monsterList.length ; i ++)
        {
            var monster = CData.inst.proxy<SysMonsterP>(EnumDbName.SYS_MONSTER).getItem(this._sysCurrentAction.monsterList[i]) as SysMonster ;
            var url = `Prefabs/Monsters/${ monster.Avatar}`;
            resArr.push(url);
        }
        resources.load(resArr,this.loadResComplete.bind(this));
        this.root = AppEntry.instance.Root;
        this._passID = passID ;
        
    }

    protected loadResComplete(error:Error,resource:any):void
    {
        if(!error)
        {
            this._loadingResComplete = true ;
        }
    }

    /**
     * 当前生成怪物数量
     */
    private _currentGenerateMonsterNum:number = 0 ;
    
    /**
     * 生成怪物
     */
    public generateMonster():void
    {
        let perTime = this._sysCurrentAction.Padding;
        let monsterCreateNum = this._sysCurrentAction.MonsterNum;
        var createNum = 0 ;
        var pathList = this._sysCurrentAction.pathList;
        var randPathIndex = Math.floor(Math.random() * pathList.length);;
        var pathId = pathList[randPathIndex];
        var monsterList = this._sysCurrentAction.monsterList;
        var monsterListCount = monsterList.length;
        var type = this._sysCurrentAction.Type;
        var sysPath:SysPath = CData.inst.proxy<SysPathP>(EnumDbName.SYS_PATH).getItem(pathId) as SysPath ;
        while(createNum < monsterCreateNum)
        {
            var time = -perTime * createNum;
            var monsterID ;
            if(monsterCreateNum > monsterListCount)
            {
                monsterID = monsterList[0];
            }else
            {
                monsterID = monsterList[createNum];
            }
            this.createMonster(monsterID,sysPath,time,type);
            createNum ++ ;
        }
    }

    /**
     * 创建怪物
     * @param monsterID 
     * @param pathId 
     * @param time 
     * @param type 
     */
    private createMonster(monsterID:number,pathId:SysPath,time:number,type:number):void
    {
        var sysMonster :SysMonster = CData.inst.proxy<SysMonsterP>(EnumDbName.SYS_MONSTER).getItem(monsterID) as SysMonster ;
        var monsterPrefab = resources.get(`Prefabs/Monsters/${sysMonster.Avatar}`,Prefab);
        if(monsterPrefab == null)
        {
            return ;
        }
        var monsterNode = objectPool.instance.getObject(monsterPrefab);
        var monster :Monster= monsterNode.getComponent(Monster);
        monsterNode.setParent(this.root);
        if(monster != null)
        {
            monster.initMonster(sysMonster,pathId,time,type);
            monster.startEmit();
            monster.node.position = pathId.startPoint;
        }
    }

}

