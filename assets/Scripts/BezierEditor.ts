import { Layers, NodeEventType,Event, EventMouse ,Node, Label, Button, Component, _decorator,screen} from "cc";
import { BezierCurve } from "./framework/Bezier/BezierCurve";
import { PathData } from "./framework/Bezier/PathData";
import { ControlNode } from "./framework/Bezier/ControlNode";

const { ccclass, property } = _decorator;

@ccclass('BezierEditor')
export class BezierEditor extends Component {

    public bezierCurve:BezierCurve = null;

    @property({type:Node})
    public gameBox:Node ;

    @property({type:Button})
    public btn_save:Button ;

    @property({type:Button})
    public btn_clear:Button ;

    constructor() {
        super();
    }

    start(): void 
    {
        
        this.btn_save.node.on(NodeEventType.TOUCH_START,this.onSaveData,this);
        this.btn_clear.node.on(NodeEventType.TOUCH_START,this.onClearData,this);
        if(!this.bezierCurve)
        {
            this.bezierCurve = new BezierCurve();
            this.bezierCurve.layer = Layers.Enum.UI_2D;
            this.gameBox.addChild(this.bezierCurve);
        }
        this.gameBox.on(Node.EventType.TOUCH_START,this.onClickTargetHandler,this);
    }


    onClearData (event: Event) 
    {
        event.propagationImmediateStopped = true;
        this.bezierCurve.clear();
        this.bezierCurve.removeFromParent();
        this.bezierCurve = null ;

        this.bezierCurve = new BezierCurve();
        this.bezierCurve.layer = Layers.Enum.UI_2D;
        this.gameBox.addChild(this.bezierCurve);
    }

    onSaveData (event: Event) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as Node;
        event.propagationImmediateStopped = true;

        var pathData = new PathData();
        let contronNodes = this.bezierCurve.controlNodes;
            let path = [];
            for(let contronNode of contronNodes)
            {
                var pos = contronNode.getPosition();
                path.push({x:pos.x,y:pos.y});
            }
            pathData.PathList = JSON.stringify(path);
            pathData.BezierLen = Math.ceil(this.bezierCurve.length_bzr);
            console.log(pathData.ToString() +"\n size:"+ screen.resolution);
        
    }

    protected onClickTargetHandler(e:EventMouse):void
    {
        var mouse =  e.getLocation();
        var node = new Node();
        var label =  node.addComponent(Label);
        label.string = "x:" + mouse.x + "y:" + mouse.y;
        node.setPosition(mouse.x,mouse.y);
        node.layer = Layers.Enum.UI_2D
        // this.gameBox.addChild(node);
        for(let control of this.bezierCurve.controlNodes)
        {
            if(control.isMove)return;
            var controlPos = control.getPosition();
            if(Math.abs(controlPos.x - mouse.x) < 20 && Math.abs(controlPos.y - mouse.y) < 20 )
            {
                let target = e.target as ControlNode ;
                let index = this.bezierCurve.controlNodes.length - 1;
                if(!!target['doDoubleClick'] == false)return 
                target.doDoubleClick();
                if(this.bezierCurve.controlNodes.indexOf(target) == index && index != -1)
                {
                    if(target.isDoubleClick)
                    {
                        target.removeFromParent();
                        this.bezierCurve.controlNodes.splice(index,1);
                        this.bezierCurve.draw();
                    }
                }
                return ;
            }
        }
        this.bezierCurve.addControlNode(mouse.x,mouse.y);
        this.bezierCurve.draw();     
    }

}
     