
/**静态数据对象基类  */
export class BaseItem {

	constructor(d: object) {
		for (const key in d) {
			this.setPropRead(key, d);
		}
		this.inited();
	}

	public update(d:any):void {
		if(!d)return;
		for(const key in d) {
			if ('_'+key in this) 
            {
                this.setPropRead('_'+key,d);
            }
			else this.setPropRead(key,d);
		}
	}

	inited() {
		
	}

	setPropRead(key: string, d: any): void 
    {
		Object.defineProperty(this, `${key}`, { value: d[key], configurable: true,writable:true,enumerable:true});	}

}
