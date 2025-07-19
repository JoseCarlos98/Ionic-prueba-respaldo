import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IonNote, IonIcon, IonGrid, IonButton, IonRow, IonCol, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";
import { Router, RouterLink } from '@angular/router';
import { Template } from '../../models/template.models';

@Component({
  selector: 'app-template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonNote,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCol,
    IonRow,
    IonButton,
    CommonModule,
    IonGrid,
    IonIcon
  ],
})
export class TemplateTableComponent implements OnDestroy {
  private onDestroy$ = new Subject<void>();

  LOCAL_STORAGE_KEY = 'plantillaPDF';

  @Input() templates: Template[] = [];

  isMobile = window.innerWidth < 768;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  deleteTemplate(id: string) {
    const currentTemplates = this.getTemplatesFromStorage();
    const updatedTemplates = currentTemplates.filter((template: Template) => template.id !== id);

    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updatedTemplates));
    this.templates = updatedTemplates;
  }

  getTemplatesFromStorage() {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
