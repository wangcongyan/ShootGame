import { CData } from "../CData";
import { EnumData } from "./EnumData";

export class  DataProxy extends EnumData
{
    public static init() 
    {
        new DataProxy().init(CData.dataHash);
    }
}
