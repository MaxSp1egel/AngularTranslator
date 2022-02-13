import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-source-text',
  templateUrl: './source-text.component.html',
  styleUrls: ['./source-text.component.css']
})
export class SourceTextComponent implements OnInit {
  _sourceText: string = "";
  _translatedText: string = "";
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  log() {
    console.log(this._sourceText);
    this.translateService.translate(this._sourceText, "fi").subscribe((response: any) => {
      this._translatedText = response.data.translations[0].translatedText
    });
    console.log(this._translatedText);
    //this._translatedText = this._sourceText;
  }
}
