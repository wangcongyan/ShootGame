import { MachineState } from "./MachineState";
import { StateController } from "./StateController";

export abstract class Transition
{
    private machine:MachineState;

    public handleTransitionComplete:Function;
    private total:number = 0;

    protected controllerList:StateController[];
    constructor(...args)
    {   
        this.total = args.length;
        this.controllerList = args;
        for(var i = 0 ; i < this.total ; i++)
        {
            var controlller:StateController = args[i];
            controlller.callBack = this.onStateComplete.bind(this);
        }
    }

    public begin(): void
    {
        this.controllerList[0].Enter();
    }

    public abstract complete():void

    private excuteTime:number = 0 ;
    protected onStateComplete():void
    {
        this.excuteTime++;
        if(this.excuteTime >= this.total)
        {
            this.complete();
            return;
        }
        this.nextStep();
    }

    protected nextStep()
    {
        var index = this.excuteTime;
        this.controllerList[index].Enter();
    }
}