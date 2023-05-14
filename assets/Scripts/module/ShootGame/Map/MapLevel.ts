import { _decorator, CCFloat, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapLevel')
export class MapLevel extends Component 
{
    @property({type:CCFloat})
    public Speed:number = 2;
}

