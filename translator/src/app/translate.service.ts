import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private _key = 'AIzaSyCceUiH6Q7wUT_5SPQJC0ADuuN5m_ecFNU';
  constructor(private _http: HttpClient) { }

  translate(text: string, sourceLanguage: string, targetLanguage: string) {
    const url: string = 'https://translation.googleapis.com/language/translate/v2?key=';
    return this._http.post(url + this._key, {
      "q": [text],
      "source": sourceLanguage,
      "target": targetLanguage
    });
  }

  getLanguages() {
    const url: string = 'https://translation.googleapis.com/language/translate/v2/languages?key=';
    return this._http.post(url + this._key, {
      "target": "ru"
    });
  }
}
