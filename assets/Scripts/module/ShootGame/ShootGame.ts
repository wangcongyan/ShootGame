import { _decorator, Component, Label, Node, Prefab } from 'cc';
import { AppEntry } from '../../AppEntry';
import { objectPool } from '../../framework/utils/objectPool';
import { Monster } from './Monster/Monster';
import { MonsterCave } from './Monster/MonsterCave';
import { Dispatcher } from '../../framework/Dispatcher';
import { EnumEventCmd } from '../../core/enum/EnumEventCmd';
const { ccclass, property } = _decorator;

@ccclass('ShootGame')
export class ShootGame extends Component 
{
    @property({type:Node})
    public root:Node ;

    @property({type:Prefab})
    public dropBell:Prefab ;

    public passID:number = 0 ;

    @property({type:Node})
    public monsterCaveNode:Node  ;

    public monsterCave:MonsterCave  ;

    @property({type:Label})
    public score:Label ;
    @property({type:Label})
    public kill:Label ;
    start() 
    {
        if(this.root == null)
        {
            this.root = this.node.getChildByName("Root");
        }
        if(this.monsterCaveNode == null)
        {
            this.monsterCaveNode = this.root.getChildByName("MonsterCave");
        }
        if(this.score == null)
        {
            this.score = this.root.getChildByName("Label_Score").getComponent(Label);
        }
        if(this.kill == null)
        {
            this.kill = this.root.getChildByName("Label_Kill").getComponent(Label);
        }
        this.monsterCave = this.monsterCaveNode.getComponent(MonsterCave);
        AppEntry.instance.Root = this.root;
        this.monsterCave.MoveToPass(1);
        Dispatcher.intance.on(EnumEventCmd.KILL_MONSTER,this,this.onKillChange)
        Dispatcher.intance.on(EnumEventCmd.SCORE_CHANGE,this,this.onScoreChange)
    }


    private onKillChange(killNum:number)
    {
        this.kill.string = `击杀数量：${killNum}`;
    }

    private onScoreChange(score:number)
    {
        this.score.string = `获得积分：${score}`;
    }

    public interval:number = 10 ;

    private _time:number = 0;
    update(deltaTime: number) 
    {
        this._time += deltaTime;
        if(this._time > this.interval)
        {
            this._time = 0;
            var dropBell = objectPool.instance.getObject(this.dropBell);
            if(dropBell)
            {
                dropBell.setPosition(Math.random() * 560 + 40 ,800);
            }
        }

    }
}

