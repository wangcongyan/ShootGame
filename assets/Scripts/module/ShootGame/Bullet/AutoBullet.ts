import { Component, Vec3, _decorator } from "cc";
import { BaseBullet } from "./BaseBullet";
import { AppEntry } from "../../../AppEntry";

const { ccclass, property } = _decorator;

@ccclass('AutoBullet')
export class AutoBullet extends BaseBullet
{


    private startPos ;
    protected onLoad(): void    
    {
        super.onLoad();
        this.startPos = this.node.getPosition();
    }
    
    protected update(dt: number): void 
    {
        if(AppEntry.instance.isPause)return;
        var isCircle = false;
        if(this._sysBulletTemplete != null)
        {
            isCircle = this._sysBulletTemplete.isCircle;
        }
        var moveRatioTime:number = dt*100;
        let moveDistance:number = this.speed*moveRatioTime + this.accelerate*moveRatioTime* moveRatioTime/2;
        var pos:Vec3,x:number,y:number;
        if(isCircle)
        {
            pos = this._emiter ? this._emiter.target.getPosition() : this.startPos;
            var angle =  this.angle += this.speed ;
             x = pos.x + this.radius * Math.cos(angle);
             y = pos.y + this.radius * Math.sin(angle);
             this.node.setPosition(x,y);
             console.log("angle = "+angle + "  x = "+x + "  y = "+y);
            return ;
        }
        pos = this.node.getPosition();
        x = pos.x + moveDistance * Math.cos(this.angle);
        y = pos.y + moveDistance * Math.sin(this.angle);
        this.node.setPosition(x,y);
    }

}