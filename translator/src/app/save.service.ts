import { Injectable } from '@angular/core';

interface Language {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }

  add(key: string, sourceLanguage: Language, targetLanguage: Language, sourceText: string, translatedText: string) {
    let savedList: Array<any> = JSON.parse(localStorage.getItem(key)!);
    console.log(savedList);

    if (savedList) {
      savedList = [{
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        sourceText: sourceText,
        translatedText: translatedText
      }, ...savedList];
    }
    else {
      savedList = [{
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        sourceText: sourceText,
        translatedText: translatedText
      }];
    }

    localStorage.setItem(key, JSON.stringify(savedList));
  }

  remove(key: string, i: number) {
    let savedList: Array<any> = JSON.parse(localStorage.getItem(key)!);

    if (savedList) {
      savedList.splice(i, 1);
    }

    localStorage.setItem(key, JSON.stringify(savedList));
  }

  get(key: string): Array<any> {
    let savedList: Array<any> = JSON.parse(localStorage.getItem(key)!);
    return (savedList) ? savedList : [];
  }
}
