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
export class TemplateTableComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input()templates: Template[] = [];

  isMobile = window.innerWidth < 768;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  constructor() { }

  ngOnInit() {
   
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
