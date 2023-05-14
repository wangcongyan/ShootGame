import { IVec2Like, Vec2, Vec3 } from "cc";
import { BezierCurve } from "../../../framework/Bezier/BezierCurve";

export class BezierPath extends BezierCurve
{

    public bezierNodes:Vec2[] = [] 
    constructor(bezierNodes:IVec2Like[] = null,length:number = 0,isEditor:boolean = false,offsetX:number = 1,offsetY:number = 1) 
    {
        super();
        this.setData(bezierNodes,length,isEditor,offsetX,offsetY);
    }   
    
    public resetPath(bezierNodes:IVec2Like[] = null,length:number = 0,isEditor:boolean = false,offsetX:number = 0,offsetY:number = 0) 
    {
        this.bezierNodes.length = 0 ;
        this.setData(bezierNodes,length,isEditor,offsetX,offsetY);
        this._firstPoint.x = this.bezierNodes[0].x;
        this._firstPoint.y = this.bezierNodes[0].y + 200;
    }

    private setData(bezierNodes:IVec2Like[] = null,length:number = 0,isEditor:boolean = false,offsetX:number = 0,offsetY:number = 0):void
    {
        if(bezierNodes) 
        {
            for(let i = 0 ; i < bezierNodes.length ; i ++)
            {
                this.bezierNodes[i] =  new Vec2();
                this.bezierNodes[i].x = bezierNodes[i].x * offsetX;
                this.bezierNodes[i].y = bezierNodes[i].y * offsetY;
            }
            this._bezierLength = length;
        }
    }


    private _firstPoint:Vec2 = new Vec2();
    public getPoint(t:number) 
    { //通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
        if(t < 0)
        {
            return this._firstPoint;
        }
        var x :number = 0,
            y:number = 0,
            n = this.bezierNodes.length - 1
            let self =  this ;
            this.bezierNodes.forEach(function(item, index) 
            {
                if(!index) 
                {
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

    private static temp:Vec3 = new Vec3();
    public getPointV3(t:number) 
    { //通过各控制点与占比t计算当前贝塞尔曲线上的点坐标
        if(t < 0)
        {
            BezierPath.temp.set(this._firstPoint.x,this._firstPoint.y,0);
            return BezierPath.temp;
        }
        var x :number = 0,
            y:number = 0,
            n = this.bezierNodes.length - 1
            let self =  this ;
            this.bezierNodes.forEach(function(item, index) 
            {
                if(!index) 
                {
                    x += item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                    y += item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                } else {
                    x += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                    y += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
                }
            })

            BezierPath.temp.set(x,y,0);
        return BezierPath.temp;
    }

}