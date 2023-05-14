import { Node } from "cc";
import { Dispatcher } from "./framework/Dispatcher";
import { EnumEventCmd } from "./core/enum/EnumEventCmd";
export class AppEntry
{
    private static _instance: AppEntry;

    public static get instance(): AppEntry
    {
        if (AppEntry._instance == null)
        {
            AppEntry._instance = new AppEntry();
        }
        return AppEntry._instance;
    }

    private _gameRoot:Node;

    public get Root():Node
    {
        return this._gameRoot;
    }

    public set Root(value:Node)
    {
        this._gameRoot = value;
    }

    /** 
     * 是否开始游戏
    */
    public isStart: boolean = false;

    /**
     * 是否暂停游戏
    */
   public isPause: boolean = false;

   /**
    * 积分
    */
   private score:number = 0 ;
   
   public AddScore(score:number)
   {
        this.score += score;
   }

   private _killMonsterNum:number = 0;

   public killMonster(type:number)
   {
        this._killMonsterNum ++ ;
        var score = 10 ;
        if(type == 1)
        {
            this._isBossDie = 1;
            score = 100; 
        }
        this.AddScore(score);
        Dispatcher.intance.event(EnumEventCmd.SCORE_CHANGE,this._killMonsterNum);
        Dispatcher.intance.event(EnumEventCmd.KILL_MONSTER,this.score);
   }

   public get KillMonsterNum()
   {
        return this._killMonsterNum;    
   }

   private _isBossDie:number ;

   public get isBoosDie():boolean
   {
      return this._isBossDie == 1;
   }

   public clear()
   {
    this._isBossDie = 0 ;
    this._killMonsterNum = 0 ;
    this.score = 0 ;
   }
}