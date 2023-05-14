import { StateController } from "./StateController";
import { Transition } from "./Transition";

export class MachineState
{
    private stateMap:Map<string,StateController> = new Map<string,StateController>();

    private currentState:string ;

    private currentController:StateController;

    private _machineName:string;

    private static machineMap:Map<string,MachineState> = new Map<string,MachineState>();
    public static getMachine(machineName:string)
    {
        var machine = this.machineMap.get(machineName);
        if(!machine)
        {
            var machine = new MachineState(machineName);
            this.machineMap.set(machineName,machine);
        }
        return machine;
    }

    constructor(name:string)
    {
        this._machineName = name;
    }

    public get machineName():string
    {
        return this._machineName;
    }

    public begin(command:string):void
    {
        var transition = this._transitionMap.get(command);
        if(transition != null)
        {
            transition.begin();
        }
    }

    /**
     * 清除状态机
     */
    public clear():void
    {
        if(this.currentController != null)
        {
            this.currentController.Exit();
            this.currentState = "";
        }
        this._transitionMap.clear();
    }

    /**
     * 注册状态控制
     * @param state 
     * @param controller 
     */
    public registerState(state:string,controller:StateController,isTranslation:boolean = true):void
    {
        if(!this.stateMap.get(state))
        {
            this.stateMap.set(state,controller);
        }
    }

    private _transitionMap:Map<string,Transition> = new Map<string,Transition>();
    public addTransition(translation:Transition,command:string, handleTransitionComplete:Function = null):MachineState
    {
        this._transitionMap.set(command,translation);
        return this ;
    }

    /**
     * 切换状态
     * @param state 
     * @returns 
     */
    public onEnter(state:string):void
    {
        if(this.currentState == state && this.currentController != null)
        {
            return; 
        }
        this.currentState = state;
        if(this.currentController != null)
        {
            this.currentController.Exit();
        }
        this.currentController = this.stateMap.get(state);
        this.currentController.Enter();
    }

    /**
     * 退出状态机
     * @param state 
     */
    public onExit(state:string)
    {
        if(this.currentState == state && this.currentController != null)
        {
            this.currentController.Exit();
        }
        this.currentController = null;
        this.currentState = "";
    }

}