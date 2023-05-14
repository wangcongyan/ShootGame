import { CCFloat, Component, Vec2, Vec3, _decorator } from "cc";
import { IEmiter } from "../Emitter/IEmiter";
const { ccclass, property } = _decorator;

@ccclass('CircleBullet')
export class CircleBullet extends Component
{
    @property(CCFloat)
    public radius:number = 50;
    @property(CCFloat)
    public startAngle:number = 0;

    @property(CCFloat)
    public speed:number = 2;

    public emiter:IEmiter;

    private startPos:Vec3;

    private _angle:number = 0;
    protected onLoad(): void {
        this.startPos = this.node.getPosition();
        this._angle = this.startAngle;
    }

    protected update(dt: number): void {
        
        var pos = this.emiter ? this.emiter.target.getPosition() : this.startPos;
       var angle =  this._angle += this.speed ;
        var x = pos.x + this.radius * Math.cos(angle * Math.PI / 180);
        var y = pos.y + this.radius * Math.sin(angle * Math.PI / 180);
        this.node.setPosition(x,y);
    }
}