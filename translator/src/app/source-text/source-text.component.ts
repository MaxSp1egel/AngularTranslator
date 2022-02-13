import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-source-text',
  templateUrl: './source-text.component.html',
  styleUrls: ['./source-text.component.css']
})
export class SourceTextComponent implements OnInit {
  _sourceText: string = "";
  _translatedText: string = "";
  _sourceLanguage: Language = { code: "ru", name: "русский" };
  _targetLanguage: Language = { code: "en", name: "английский" };
  _languageList: Array<Language> = [];

  constructor(private _translateService: TranslateService) { }

  ngOnInit(): void {
    this._translateService.getLanguages().subscribe((response: any) => {
      for (var language of response.data.languages) {
        this._languageList.push({ code: language.language, name: language.name });
      }
    });
    console.log(this._languageList);
  }

  updateSourceLanguage(event: any) {
    this._languageList.forEach((language) => {
      if (language.name === event.target.value) {
        this._sourceLanguage = language;
      }
    });
    console.log(this._sourceLanguage);
  }

  updateTargetLanguage(event: any) {
    this._languageList.forEach((language) => {
      if (language.name === event.target.value) {
        this._targetLanguage = language;
      }
    });
    console.log(this._targetLanguage);
  }

  translate() {
    this._translateService.translate(this._sourceText, this._sourceLanguage.code, this._targetLanguage.code).subscribe((response: any) => {
      this._translatedText = response.data.translations[0].translatedText
    });
  }
}
