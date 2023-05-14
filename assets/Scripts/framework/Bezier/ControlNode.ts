
import { Label, NodeEventType,Node, Gradient, Graphics, Layers, Size, screen } from "cc";
import { BezierCurve } from "./BezierCurve";
export class ControlNode extends Node
{
    public text:Label ;
    public bezierCurve:BezierCurve;
    public index:number ;
    public isMove:boolean = false;
    private graphic:Graphics;

    private labelNode:Node;

    private winSize:Size;
    constructor(index:number)
    {
        super();
        this.layer = Layers.Enum.UI_2D;
        this.index = index;

        this.graphic = this.addComponent(Graphics);

        this.labelNode = new Node();
        this.labelNode.layer = Layers.Enum.UI_2D;
        this.text = this.labelNode.addComponent(Label);
        this.addChild(this.labelNode);

        this.text.fontSize = 16 ;
        this.text.string = 'p' + this.index ;

        this.winSize = screen.resolution;
        this.addEvent();
        this.draw();
    }

    private draw()
    {
        var graph = this.graphic;
        graph.clear() ;
        graph.lineWidth = 2;
        graph.fillColor.fromHEX('#ff0000');
        graph.rect(-10, -10, 20, 20);
        graph.close();
        graph.stroke();
        graph.fill();
    }

    private _isDoubleClick:boolean = false;
    private _lastClickTime:number = 0;
    public doDoubleClick():void
    {
        let currentTime = new Date().getTime();
        console.log(currentTime - this._lastClickTime)
        if(currentTime - this._lastClickTime < 400)
        {
            this._isDoubleClick = true ;
        }else
        {
            this._isDoubleClick = false ;
        }        
        this._lastClickTime = currentTime ;
    }

    public get isDoubleClick():boolean
    {
        return this._isDoubleClick;
    }

    public addEvent():void
    {
        this.on(NodeEventType.TOUCH_START, this.onMouseDown, this);
        this.on(NodeEventType.TOUCH_CANCEL, this.onMouseUp, this);
        this.on(NodeEventType.TOUCH_END, this.onMouseUp, this);
    }


    private onMouseDown(e):void
    {
        this.on(NodeEventType.TOUCH_MOVE, this.onMouseMove, this);
    }

    private onMouseUp(e):void
    {
        this.off(NodeEventType.TOUCH_MOVE, this.onMouseMove);
        this.bezierCurve.draw();
        this.isMove = false;
    }

    private onMouseMove(evt):void
    {
        var pos = evt.getLocation();
        
        var offsetX = (this.winSize.width -  pos.x ) / this.winSize.width;
        var x =  offsetX > 0.98 ? 0 : (offsetX < 0.02 ? this.winSize.width : pos.x);
        var offsetY = (this.winSize.height -  pos.y ) / this.winSize.height;
        var y =  offsetY > 0.98 ? 0 : (offsetY < 0.02 ? this.winSize.height : pos.y);
        this.setPosition(x,y);
        this.text.string = 'p' + this.index + ':' +  x + ',' + y;
        this.isMove = true;
        this.bezierCurve.draw();
    }
}