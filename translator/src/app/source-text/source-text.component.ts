import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

interface Language {
  code: string;
  name: string;
}

interface Save {
  sourceLanguage: Language;
  targetLanguage: Language;
  sourceText: string;
  translatedText: string;
}

@Component({
  selector: 'app-source-text',
  templateUrl: './source-text.component.html',
  styleUrls: ['./source-text.component.css']
})
export class SourceTextComponent implements OnInit {
  _isActive = false;
  _sourceText: string = "";
  _translatedText: string = "";
  _sourceLanguage: Language = { code: "ru", name: "русский" };
  _targetLanguage: Language = { code: "en", name: "английский" };
  _languageList: Array<Language> = [];
  _savedList: Array<Save> = [];

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
    this._translateService.getLanguages().subscribe((response: any) => {
      for (var language of response.data.languages) {
        this._languageList.push({ code: language.language, name: language.name });
      }
    });

    this._savedList = JSON.parse(localStorage.getItem('Texts')!);
  }

  updateSourceLanguage(event: any) {
    this._languageList.forEach((language) => {
      if (language.name === event.target.value) {
        this._sourceLanguage = language;
      }
    });
  }

  updateTargetLanguage(event: any) {
    this._languageList.forEach((language) => {
      if (language.name === event.target.value) {
        this._targetLanguage = language;
      }
    });
  }

  translate() {
    this._translateService.translate(this._sourceText, this._sourceLanguage.code, this._targetLanguage.code).subscribe((response: any) => {
      this._translatedText = response.data.translations[0].translatedText
    });
  }

  save() {
    this._savedList = [{
      sourceLanguage: this._sourceLanguage,
      targetLanguage: this._targetLanguage,
      sourceText: this._sourceText,
      translatedText: this._translatedText
    }, ...this._savedList];

    localStorage.setItem('Texts', JSON.stringify(this._savedList));
  }

  delete(i: number) {
    this._savedList.splice(i, 1);

    localStorage.clear();
    localStorage.setItem('Texts', JSON.stringify(this._savedList));
  }

  setActive() {
    this._sourceText = "";
    this._translatedText = "";
    this._sourceLanguage = { code: "ru", name: "русский" };
    this._targetLanguage = { code: "en", name: "английский" };
    this._isActive = !this._isActive;
  }
}
