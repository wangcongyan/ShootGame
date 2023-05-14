import { Transition } from "../core/state/Transition";


export class PreloadTransition extends Transition
{

    public complete(): void 
    {
        if(this.handleTransitionComplete != null)
        {
            this.handleTransitionComplete();
        }
    }

  
}