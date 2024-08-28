import {Component, Inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MatIconButton} from "@angular/material/button";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatAccordion, MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatIconButton,
    KeyValuePipe,
    NgForOf,
    NgIf,
    MatIcon,
    MatExpansionModule,
  ],
  templateUrl: './detail.component.html',
  styles:[`table, th, td {
    padding: 10px;
    border: 1px solid gray;
    border-collapse: collapse;
  }
  `],

})
export class DetailComponent {

  public panelOpenState = signal(false)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: DialogRef<DetailComponent>) {
    console.log(this.data)
  }

  isOfficialTranslation(value: unknown): value is { official: string } {
    return typeof value === 'object' && value !== null && 'official' in value;
  }


  isCommonNativeName(value: unknown): value is { common: string } {
    return typeof value === 'object' && value !== null && 'common' in value;
  }

  isDemonym(value: unknown): value is { f: string } {
    return typeof value === 'object' && value !== null && 'f' in value;
  }
}
