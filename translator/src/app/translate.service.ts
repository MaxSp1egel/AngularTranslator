import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const { Translate } = require('@google-cloud/translate').v2;

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private _url = 'https://translation.googleapis.com/language/translate/v2?key=';
  private _key = 'AIzaSyCceUiH6Q7wUT_5SPQJC0ADuuN5m_ecFNU';
  constructor(private _http: HttpClient) { }

  translate(text: String, language: String) {
    return this._http.post(this._url + this._key, {
      "q": [text],
      "target": language
    });
  }

  getLanguages() {
    return this._http.get(this._url + this._key);
  }
}
