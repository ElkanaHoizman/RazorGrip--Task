import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jsonp, Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  api = `https://api.flickr.com/services/feeds/photos_public.gne?&format=json`;
  constructor( private _jsonp: Jsonp) { }

  get() {
    return this._jsonp.get(`${this.api}&jsoncallback=JSONP_CALLBACK`);
  }
}
