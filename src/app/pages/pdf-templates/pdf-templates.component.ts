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
      "name": "Plantilla de muestra",
      "pageSize": "carta",
      "header": [
        {
          "type": "image",
          "content": "data:image/png;base64,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",
          "styles": {
            "width": null,
            "height": 100
          }
        },
        {
          "type": "text",
          "content": "<p class=\"ql-align-center\"></p><p class=\"ql-align-center\"><strong>Nutrición Clínica</strong></p><p class=\"ql-align-center\">Homero simpson</p>",
          "styles": {
            "width": 100,
            "height": 100
          }
        },
        {
          "type": "text",
          "content": "<p class=\"ql-align-right\"><strong>MENÚ SEMANAL</strong></p><p class=\"ql-align-right\"><strong>Paciente: </strong>Homero Simpson</p><p class=\"ql-align-right\"><strong>Calorías totales:</strong> 2000 kcal</p><p class=\"ql-align-right\"><strong>Fecha:</strong> 17 de julio de 2025</p>",
          "styles": {
            "width": 100,
            "height": 100
          }
        }
      ],
      "footer": [
        {
          "type": "text",
          "content": "<p class=\"ql-align-center\"><span class=\"ql-size-small\">Instituto de Salud Digestiva y Hepática: Blvd Puerta de Hierro 5150 Torre &quot;A&quot; Piso 6 José María Heredia 2960 Int 710 &quot;Torre 2, Hospital San Javier&quot; </span></p><p class=\"ql-align-center\"><span class=\"ql-size-small\">Tels.: (33)38133037, (33)38134160, (33)24727050y 51 </span></p><p class=\"ql-align-center\"><span class=\"ql-size-small\">Contacto: Homero simpson| Tel: [Teléfono] homer.simspson@saluddigestiva.com</span></p>",
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
      },
      "id": "ae899924-90fc-4dd9-b282-78d54cdcae2e"
    }
  ]

  ngOnInit() {
    setTimeout(() => {
      const storedTemplates = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (storedTemplates) this.templates = JSON.parse(storedTemplates);
      else this.templates = this.dummy
    }, 500);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
