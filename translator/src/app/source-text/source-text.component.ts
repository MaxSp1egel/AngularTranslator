import { Component, OnInit } from '@angular/core';
import { SaveService } from '../save.service';
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

  constructor(private _translateService: TranslateService, private _saveService: SaveService) { }

  ngOnInit(): void {
    this._translateService.getLanguages().subscribe((response: any) => {
      for (var language of response.data.languages) {
        this._languageList.push({ code: language.language, name: language.name });
      }
    });

    this._savedList = this._saveService.get('Texts');
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
    this._saveService.add('Texts', this._sourceLanguage, this._targetLanguage, this._sourceText, this._translatedText);
    this._savedList = this._saveService.get('Texts');
  }

  delete(i: number) {
    this._saveService.remove('Texts', i);
    this._savedList = this._saveService.get('Texts');
  }

  setActive() {
    this._sourceText = "";
    this._translatedText = "";
    this._sourceLanguage = { code: "ru", name: "русский" };
    this._targetLanguage = { code: "en", name: "английский" };
    this._isActive = !this._isActive;
  }
}
