// src/app/shared/components/error-modal/error-modal.component.ts
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="error-list">
        <div *ngFor="let error of errors" class="error-item">
          <ion-icon name="alert-circle-outline" color="danger"></ion-icon>
          <span [innerHTML]="error"></span>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" (click)="dismiss()" class="ion-margin">Aceptar</ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [
    `
      .error-list {
        .error-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;

          ion-icon {
            margin-right: 0.5rem;
            font-size: 1.5rem;
            min-width: 24px;
          }

          span {
            flex: 1;
            line-height: 1.4;
          }
        }
      }
    `,
  ],
})
export class ErrorModalComponent {
  @Input() title: string = 'Errores en el formulario';
  @Input() errors: string[] = [];

  constructor(private modalCtrl: ModalController) {
    console.warn({ errors: this.errors });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
