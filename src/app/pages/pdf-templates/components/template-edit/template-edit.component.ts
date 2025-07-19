import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonSelectOption, IonSelect, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCardContent, IonCard, IonItem, IonLabel, IonRange, IonSegmentButton, IonSegment, IonContent, IonToolbar, IonGrid, IonRow, IonCol, IonToggle, IonInput, IonCheckbox, IonRadioGroup, IonRadio, IonImg, IonTitle, IonHeader, IonButtons, IonFooter } from "@ionic/angular/standalone";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subject } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Template, TemplateElement } from '../../models/template.models';
import { v4 as uuidv4 } from 'uuid';

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

  LOCAL_STORAGE_KEY = 'plantillaPDF';

  watermark = new FormControl<boolean>(false);

  isDragOver: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.templateForm = this.fb.group({
      name: [''],
      pageSize: ['carta'],
      header: this.fb.array([
        this.createColumn()
      ]),
      footer: this.fb.array([
        this.createColumn()
      ]),
      watermark: this.fb.group({
        enabled: [false],
        opacity: [100],
        width: [100],
        height: [100],
        image: ['']
      })
    });

    this.activeRoute.paramMap.subscribe(params => {
      this.templateId = params.get('id') ?? '';

      if (this.templateId) {
        const templates = this.getTemplatesFromStorage();
        const templateToEdit = templates.find((t: Template) => t.id === this.templateId);

        if (templateToEdit) {
          this.templateForm.patchValue({
            name: templateToEdit.name,
            pageSize: templateToEdit.pageSize,
            watermark: templateToEdit.watermark
          });

          this.patchFormArray(this.headerColumns, templateToEdit.header);
          this.patchFormArray(this.footerColumns, templateToEdit.footer);
        }
      }
    });
  }

  patchFormArray(formArray: FormArray, data: TemplateElement[]) {
    formArray.clear();
    data.forEach(item => {
      formArray.push(this.fb.group({
        type: [item.type],
        content: [item.content],
        styles: this.fb.group({
          width: [item.styles.width],
          height: [item.styles.height]
        })
      }));
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

  saveTemplate() {
    const currentTemplates = this.getTemplatesFromStorage();
    let updatedTemplate = { ...this.templateForm.value };
    let newTemplates: Template[] = [];
    
    updatedTemplate.id = this.templateId ? this.templateId : uuidv4();
    if (this.templateId) newTemplates = currentTemplates.map((template: Template) => template.id === this.templateId ? updatedTemplate : template);
     else newTemplates = [...currentTemplates, updatedTemplate];

    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(newTemplates));
    this.router.navigateByUrl('pdf-template');
  }

  getTemplatesFromStorage() {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  pinOpacity(value: number) {
    return `${value}%`;
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
 setTimeout(() => {
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

      const totalPages = 3;
      for (let i = 1; i <= totalPages; i++) {
        if (i > 1) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        pdf.setFontSize(10);
        pdf.setTextColor(150);
        pdf.setFont('helvetica', 'normal');

        const text = `Página ${i} de ${totalPages}`;
        const textWidth = pdf.getTextWidth(text);
        const x = pageWidth - textWidth - 10;
        const y = pageHeight - 10;
        pdf.text(text, x, y);
      }

      pdf.save('plantilla.pdf');
    });
      }, 100);
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content || '(sin contenido)');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
