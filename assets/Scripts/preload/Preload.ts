import { MachineState } from "../core/state/MachineState";
import { PreloadTransition } from "./PreloadTransition";
import { PrepareLoadDataController } from "./PrepareLoadDataController";
import { PrepareLoadResController } from "./PrepareLoadResController";

export class Preload
{
    private machine:MachineState;

    private loadComplete:Function;
    private loadPregress:Function;

    public constructor(loadComplete:Function,loadPregress:Function)
    {
        this.loadComplete = loadComplete;
        this.loadPregress = loadPregress;
    }

    init()
    {
        this.machine = new MachineState("Preload");
        var loadDataController = new PrepareLoadDataController(this.loadPregress);
        var loadResController = new PrepareLoadResController(this.loadPregress);
        this.machine.registerState("LoadData",loadDataController);
        this.machine.registerState("LoadRes",loadDataController);

        var translateComponent = new PreloadTransition(loadDataController,loadResController);
        translateComponent.handleTransitionComplete = this.OnLoadComplete.bind(this);
        this.machine.addTransition(translateComponent,"Preload",this.OnLoadComplete.bind(this));
        this.machine.begin("Preload");
    }

    private OnLoadComplete():void
    {
        if(this.loadComplete != null)
        {
            this.loadComplete();
        }
    }
}