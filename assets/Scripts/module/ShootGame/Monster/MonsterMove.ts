import { _decorator, Component, screen } from 'cc';
import { Monster } from './Monster';
import { BezierPath } from './BezierPath';
import { SysMonster } from '../../../core/data/SysMonsterP';
import { SysPath, SysPathP } from '../../../core/data/SysPathP';
import { EnumDbName } from '../../../core/enum/EnumDbName';
import { CData } from '../../../core/CData';
const { ccclass, property } = _decorator;

@ccclass('MonsterMove')
export class MonsterMove extends Component 
{
    
    private _bezier:BezierPath;
    private monster:Monster;
    private _moveTimer:number = 0;
    private _totleTime:number ;
    private speed:number = 0.1;
    private sysPath:SysPath;
    private _isBack:boolean;
    protected onEnable(): void 
    {
        this.monster = this.getComponent(Monster);
        this.sysPath = this.monster.sysPath;
        this.resetPath(this.sysPath);
    }

    private resetPath(sysPath:SysPath)
    {
        this.speed = this.monster.sysMonster.Speed * sysPath.Speed;
        var resolution = screen.resolution;
        var offsetX =  resolution.width/ sysPath.Width ;
        var offsetY =  resolution.height / sysPath.Height ;
        if(!this._bezier)
        {
            this._bezier = new BezierPath(sysPath.paths,sysPath.BezierLen,false,offsetX,offsetY);
        }else
        {
            this._bezier.resetPath(sysPath.paths,sysPath.BezierLen,false,offsetX,offsetY);
        }
        this._totleTime  =  Math.ceil(this._bezier.length_bzr/this.speed);
        this._moveTimer = this.monster.startTime * this._totleTime;
        var point = this._bezier.getPointV3(this._moveTimer/this._totleTime);
        this.node.setPosition(point);
        this.isBack = this.sysPath.Back == 1; 
        this.ratio = 1 ;
    }

    private isBack :boolean  = false;
    private ratio:number = 1;
    update(deltaTime: number) 
    {
        const moveTime = this._totleTime ;
        if(this._moveTimer > 0 && this.monster.sysMonster.IsBoss)
        {
            this.monster.canEmitBullet = true ;
        }
        if(this._moveTimer < 0 && this.isBack)
        {
            this._moveTimer = 0 ;
            this.ratio = 1; 
        }
        this._moveTimer += deltaTime*this.ratio  ;
        if(this._moveTimer >= moveTime)
        {   
            if(this.sysPath.NextPath > 0)
            {
                this.sysPath = CData.inst.proxy<SysPathP>(EnumDbName.SYS_PATH).getItem(this.sysPath.NextPath);
                this.resetPath(this.sysPath);
                return;
            }
            if(this.sysPath.Circle)
            {
                if(this.isBack)
                {
                    this._moveTimer = moveTime ;
                    this.ratio = -1;
                }else
                {
                    this._moveTimer = 0 ;
                    this.ratio = 1 ;
                }
            }else
            {
                this.monster.dead(true);
                return;
            }
        }
        let time = this._isBack ? moveTime - this._moveTimer : this._moveTimer ;
         var point = this._bezier.getPointV3(time/moveTime);
        this.node.setPosition(point);
    }
}

