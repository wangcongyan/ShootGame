
import {Vec2 ,Node, Graphics,Color, Layers} from "cc";
import { ControlNode } from "./ControlNode";
export class BezierCurve extends Node
{
    public controlNodes:Array<ControlNode> = [] //点击的控制点对象数组

    private _graphics:Graphics;
    constructor()
    {
        super();   
        
        this._graphics =  this.addComponent(Graphics);
    }

    /**
     * addControlNode
     */
    public addControlNode(x:number,y:number):void 
    {
        let index = this.controlNodes.length;
        let controlNode:ControlNode = new ControlNode(index);
        controlNode.setPosition(x,y);
        controlNode.bezierCurve = this;
        this.addChild(controlNode);
        
        this.controlNodes.push(controlNode);
    }

    public deleteControlNode(target:ControlNode):void
    {
        
    }   

    public _bezierLength:number = 0 ;

        /**
     * 获得线的长度
     * 
     * @return 
     * 
     */
    public get length_bzr() : number
    {
        if(this._bezierLength == 0)
        {
            this._bezierLength = this.getSegmentLength(1.0);
        }
        return this._bezierLength;
    }

        /**
     * 按位置比例获得线的长度
     * 
     * @param time	比例系数
     * @return 
     * 
     */

    public getSegmentLength(time : number) : number
    {
        let result = 0;
        var point:any = this.getPoint(0/1000);
        let start:Vec2 = new Vec2(point.x ,point.y);
        let temp:any ;
        for(let i = 0 ; i < 1000 ; i ++)
        {
            temp = this.getPoint(i/1000);
            result += Vec2.distance(start,new Vec2(temp.x,temp.y));
            start.set(temp.x,temp.y);
        }
        return result ;
    }

    public factorial(num:number):number 
    { //递归阶乘
        if (num <= 1) {
            return 1;
        } else {
            return num * this.factorial(num - 1);
        }
    }

    public bezier(arr:Array<any>, t:number) { //通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
        var x = 0,
            y = 0,
            n = arr.length - 1;
            let self =  this ;
            arr.forEach(function(item, index) {
            if(!index) {
                x += item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                y += item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
            } else {
                x += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                y += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
            }
        })
        return {
            x: x,
            y: y
        }
    }
    
    public getPoint(t:number) { //通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
        var x :number = 0,
            y:number = 0,
            n = this.controlNodes.length - 1
            let self =  this ;
            this.controlNodes.forEach(function(item, index) 
            {
                var pos = item.getPosition();
                if(!index) 
                {
                
                    x += pos.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                    y += pos.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                } else {
                    x += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * pos.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                    y += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * pos.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                }
            })
        return {
            x: x,
            y: y
        }
    }

    public draw():void
    {
        this.drawLine();
    }

    public clear():void
    {
        for(let control of this.controlNodes)
        {
            control.removeFromParent();
        }
        
        this.controlNodes.length = 0;
        this._graphics.clear();
    }

    private drawLine():void
    {
        let $g = this._graphics;
        $g.clear();
        $g.lineWidth = 2;
        $g.strokeColor = Color.RED;
        let bezierList = [];
        for(let i = 0 ; i < 100 ; i ++)
        {
            var point = this.getPoint(i/100);
            bezierList.push(point.x,point.y);
        }
        $g.moveTo(bezierList[0],bezierList[1]);
        for(let i = 2 ; i < bezierList.length ; i += 2)
        {
            $g.lineTo(bezierList[i],bezierList[i + 1]);
        }
        $g.stroke();
        $g.close();
    }
}
