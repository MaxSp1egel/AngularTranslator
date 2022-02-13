import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-text',
  templateUrl: './source-text.component.html',
  styleUrls: ['./source-text.component.css']
})
export class SourceTextComponent implements OnInit {
  _sourceText: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  log() {
    console.log(this._sourceText);
  }
}
