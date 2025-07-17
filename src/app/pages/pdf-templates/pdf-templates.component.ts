import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateTableComponent } from './components/template-table/template-table.component';
import { IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from "@ionic/angular/standalone";
import { Subject } from 'rxjs';
import { RouterLink } from '@angular/router';

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

  constructor() { }

  openCreateModal() {
    console.log('Abrir modal de crear nueva plantilla');
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
