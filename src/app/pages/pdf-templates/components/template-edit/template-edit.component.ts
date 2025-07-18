import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonSelectOption, IonSelect, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCardContent, IonCard, IonItem, IonLabel, IonRange, IonSegmentButton, IonSegment, IonContent, IonToolbar, IonGrid, IonRow, IonCol, IonToggle, IonInput, IonCheckbox, IonRadioGroup, IonRadio, IonImg, IonTitle, IonHeader, IonButtons, IonFooter } from "@ionic/angular/standalone";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subject } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss'],
  standalone: true,
  imports: [IonFooter, IonButtons, IonHeader, IonTitle, IonImg, IonRadio, IonRadioGroup, IonCheckbox,
    IonInput,
    IonToggle,
    IonCol,
    IonRow,
    IonGrid,
    IonToolbar,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonRange,
    IonLabel,
    IonSelectOption,
    IonItem,
    IonCard,
    IonSelect,
    IonCardContent,
    RouterLink,
    IonIcon,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
  ]
})
export class TemplateEditComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  templateId: string = '';
  useImage: boolean = false;

  templateForm!: FormGroup;

  watermark = new FormControl<boolean>(false);

  isDragOver: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.templateId = params.get('id') ?? '')

    this.templateForm = this.fb.group({
      pageSize: ['carta'],
      header: this.fb.array([
        this.createColumn()
      ]),
      footer: this.fb.array([
        this.createColumn()
      ]),
      watermark: this.fb.group({
        opacity: [0],
        width: [0],
        height: [0],
        image: ['']
      })
    });
  }

  createColumn() {
    return this.fb.group({
      type: ['text'],
      content: [''],
      styles: this.fb.group({
        width: [100],
        height: [100]
      })
    });
  }

  get headerColumns() {
    return this.templateForm.get('header') as FormArray;
  }

  get footerColumns() {
    return this.templateForm.get('footer') as FormArray;
  }

  get watermarkGroup() {
    return this.templateForm.get('watermark') as FormGroup;
  }

  addHeaderColumn() {
    this.headerColumns.push(this.createColumn());
  }

  removeHeaderColumn(index: number) {
    this.headerColumns.removeAt(index);
  }

  addFooterColumn() {
    this.footerColumns.push(this.createColumn());
  }

  removeFooterColumn(index: number) {
    this.footerColumns.removeAt(index);
  }

  logForm() {
    localStorage.setItem('plantillaPDF', JSON.stringify(this.templateForm.value));
  }

  pinOpacity(value: number) {
    return value;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDropped(event: DragEvent, col: AbstractControl) {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) this.convertFileToBase64(event.dataTransfer.files[0], col);
  }

  onFileSelected(event: any, col: AbstractControl) {
    const file = event.target.files[0];
    if (file) this.convertFileToBase64(file, col);
  }

  convertFileToBase64(file: File, col: AbstractControl) {
    const reader = new FileReader();
    reader.onload = () => col.get('content')?.setValue(reader.result as string);
    reader.readAsDataURL(file);
  }

  onFileDroppedWatermark(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.readFile(file);
  }

  onFileSelectedWatermark(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.readFile(file);
  }

  readFile(file: File) {
    if (!file.type.startsWith('image/')) {
      console.error('El archivo no es una imagen');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      this.watermarkGroup.get('image')?.setValue(base64);
    };
    reader.readAsDataURL(file);
  }

  exportPDF() {
    const data = document.querySelector('.c-content-pdf') as HTMLElement;
const pageFormat = this.templateForm.get('pageSize')?.value === 'media-carta' ? [530, 816] : 'a4';

    html2canvas(data, {
      scale: 3,
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: pageFormat
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('plantilla.pdf');
    });
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content || '(sin contenido)');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
