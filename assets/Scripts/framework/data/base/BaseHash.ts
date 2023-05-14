import { Dictionary } from "../Dictionary";
import { BaseItem } from "./BaseItem";
export class BaseHash 
{

	// -- CONSTANT -- //
	protected static KEY_SPACE = '_';

	// -- PARAMS -- //
	protected _name: string;					// 字典名
	protected _dic: Dictionary = null;		// 字典详细
	protected _mainKeys: Array<string>;			// 索引key
	protected _itemCls: any;
	protected _listCache: Array<any> = [];		// 静态查询缓存

	/**
	 * @param name 数据表名
	 * @param data 数据json结构,可以是json，也可以是数组
	 * @param itemCls 数据对象类
	 */
	constructor(name: string, mainKeys: any = null, itemCls: any = null) {
		this._name = name;
		this._dic = new Dictionary();
		this._mainKeys = mainKeys instanceof Array ? mainKeys : [mainKeys];
		this._itemCls = itemCls == null ? BaseItem : itemCls;
	}

	protected getKey(keys: Array<string>, data: any): string {
		return keys.length == 1 ? data[keys[0]] :
			keys.reduce((p, n) => {
				if (data.hasOwnProperty(p)) {
					return data[p] + BaseHash.KEY_SPACE + data[n];
				} else {
					return p + BaseHash.KEY_SPACE + data[n];
				}
			});
	}

	/**
	 * 获取数据 
	 * @param keyId 主键
	 */
	public getItemByMainKey(keyId: any): object {
		if (keyId instanceof Array) {
			keyId = keyId.join(BaseHash.KEY_SPACE);
		}
		return this._dic.get(keyId);
	}

	protected checkMainKey(item: any) {
		for (let key of this._mainKeys) {
			let tmp: any = item[key];
			if (tmp == undefined) return null;
		}
		return true;
	}

	/**
		 * 添加数据 
		 * @param item 添加的数据对象
		 * @return 
		 * 
		 */
	public addItem(item: object): object {
		if (!this.checkMainKey(item)) return null;
		const key: string = this.getKey(this._mainKeys, item);
		const preItem: object = this.getItemByMainKey(key);
		if (!preItem) {
			this._itemCls != null && (item = new this._itemCls(item));
			this._dic.set(key, item);
			return item;
		}
		return preItem;
	}

	// 默认的单项结构
	public get length(): number { return this._dic.keys.length; }
	public get name(): string { return this._name; }
	public get values(): Array<any> { return this._dic.values.concat(); }
	public get keys(): Array<any> { return this._dic.keys.concat(); }

	// -- export -- //
	/**
	 * 初始化数据 
	 */
	initData(data:any) {
		data = data ? data : [];
		let list: Array<any> = typeof data == 'string' ? JSON.parse(data) : data
		for (let d of list) {
			if (!d) continue;
			// let item:any = new Object();
			let itemData: any = new this._itemCls()
			for (let index in this._itemCls.KEYS) {
				let i = parseInt(index);
				let itemKey = this._itemCls.KEYS[i];
				itemData[itemKey] = d[i];
			}
			let key: any = this.getKey(this._mainKeys, itemData);
			this._dic.set(key, itemData);
		}
	}
	/**
	 * 获取数据 
	 */
	public getItem(keyId: any) {
		if (keyId instanceof Array && keyId.length > 1) {
			keyId = keyId.join(BaseHash.KEY_SPACE);
		} else if (keyId instanceof Array && keyId.length == 1) {
			keyId = keyId[0];
		}
		return this._dic.get(keyId);
	}

	/**
	 * 根据key名字和key的属性获取数据列表 ,全靠遍历，不会生成hash缓存
	 * @param keyName 属性名，支持多个key的组合用法如,["ItemID","Level"],也可以是单个如"ItemID"
	 * @param keyValue 查询属性的id值，对应keyName，如[12,2],单个的可以如12
	 */
	public searhItems(keys: any, values: any): Array<any> {
		let key: string = keys instanceof Array ? keys.join(BaseHash.KEY_SPACE) : keys;
		let keyValue: string = values instanceof Array ? values.join(BaseHash.KEY_SPACE) : values;
		if (this._mainKeys instanceof Array && key == this._mainKeys.join(BaseHash.KEY_SPACE)) return [this.getItem(keyValue)];
		let result: Array<any> = [];
		for (let valueItem of this._dic.values) {
			let itemKey: string = this.getKey(keys, valueItem).toString();
			if (itemKey == keyValue) {
				result.push(valueItem);
			}
		}
		return result;
	}

	public clearAll() {
	}
}