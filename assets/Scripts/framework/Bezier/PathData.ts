export class PathData
{
    public PathID:number;
    public PathList:string;
    public BezierLen:number = 0;

    public ToString():string
    {
        return this.PathList + "|" + this.BezierLen ;
    }
}