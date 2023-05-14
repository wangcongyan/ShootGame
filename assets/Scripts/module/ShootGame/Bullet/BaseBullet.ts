import { Component, _decorator } from "cc";
import { SysBullet } from "../../../core/data/SysBulletP";
import { SysBulletTemplete } from "../../../core/data/SysBulletTempleteP";
import { Bullet } from "./Bullet";
import { IEmiter } from "../Emitter/IEmiter";
const { ccclass, property } = _decorator;

@ccclass('BaseBullet')
export abstract class BaseBullet extends Component
{
    protected _sysBullet:SysBullet;
    protected _sysBulletTemplete:SysBulletTemplete;
    protected _bullet:Bullet;
    protected _emiter:IEmiter;

    protected speed:number ;
    protected accelerate:number;
    protected angle:number;

    protected radius:number;
    protected onLoad(): void 
    {
        this._bullet = this.getComponent(Bullet);
        this._sysBullet = this._bullet.sysBullet;
        this._sysBulletTemplete = this._bullet.sysBulletTemplete;
        this._emiter = this._bullet.emiter;
        this.radius = this._bullet.radius;
        this.speed = this._sysBulletTemplete.Speed;
        this.accelerate = this._sysBulletTemplete.Accelerate;
        this.angle = this._bullet.angle;
    }

}