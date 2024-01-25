import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public insert(key: string, value:any){
    try {
      let val:string = JSON.stringify(value);
      localStorage.setItem(key, val);
    } catch (e: any) {
      console.error('insert', e.error);
    }
	}

	public select(key: string){
    try {
      let item:any = localStorage.getItem(key);
      console.log('select', item, key);
      return item? JSON.parse(item): null;
    } catch (e: any) {
      console.error('select', e.error);
    }
	}

  public update (key: string , value: any){
    try {
      let item:any = this.select(key);
      console.log('update', item);
      return item ? localStorage.setItem(key, JSON.stringify(value)) : null;
    } catch (e: any) {
      console.error('update', e.error);
    }
	}

	public remove(key: string){
    try {
      return localStorage.removeItem(key);
    } catch (e: any) {
      console.error('remove', e.error);
    }
	}
}
