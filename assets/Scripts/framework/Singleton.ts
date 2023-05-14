export class Singleton
{
    private static _instance:any;
    static  Instance<T>():T 
    {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance as T;
    }

}