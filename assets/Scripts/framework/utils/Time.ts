import { System } from "../../core/data/System";

export const getServerTime = (): number => 
{
    const now: number = Date.now();
    return Math.ceil(System.systemTime + (now - System.systemTimeTag) / 1000);
}
