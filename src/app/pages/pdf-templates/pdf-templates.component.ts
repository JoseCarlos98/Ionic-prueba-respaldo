import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateTableComponent } from './components/template-table/template-table.component';
import { IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/angular/standalone";
import { Subject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Template } from './models/template.models';

@Component({
  selector: 'app-pdf-templates',
  templateUrl: './pdf-templates.component.html',
  styleUrls: ['./pdf-templates.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    RouterLink,
    IonIcon,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    CommonModule,
    ReactiveFormsModule,
    TemplateTableComponent
  ],
})
export class PdfTemplatesComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  LOCAL_STORAGE_KEY = 'plantillaPDF';

  templates: Template[] = [];

  dummy: Template[] = [
    {
      "name": "Coca cola",
      "pageSize": "media-carta",
      "header": [
        {
          "type": "image",
          "content": "data:image/png;base64,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",
          "styles": {
            "width": 100,
            "height": 100
          }
        },
        {
          "type": "text",
          "content": "<p class=\"ql-align-right\"></p><p class=\"ql-align-right\"><strong class=\"ql-size-large\">Coca Cola</strong></p>",
          "styles": {
            "width": 100,
            "height": 100
          }
        }
      ],
      "footer": [
        {
          "type": "text",
          "content": "<p class=\"ql-align-center\"><span style=\"color: rgb(187, 187, 187);\">Coca Cola</span></p>",
          "styles": {
            "width": 100,
            "height": 100
          }
        }
      ],
      "watermark": {
        "opacity": 0,
        "width": 0,
        "height": 0,
        "image": ""
      }
    }
  ]

  ngOnInit() {
    const storedTemplates = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    console.log(JSON.parse(storedTemplates!));
    if (storedTemplates) this.templates = JSON.parse(storedTemplates);
    else this.templates = this.dummy
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
