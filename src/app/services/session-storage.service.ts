import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

	public insert( key: string, value:any ){
		let val:string = JSON.stringify( value );
		sessionStorage.setItem( key, val);
	}

	public select( key: string ){
		let item:any = sessionStorage.getItem( key );
		return item? JSON.parse( item ): null;
	}

	public remove( key: string ){
		return sessionStorage.removeItem( key );
	}
}
