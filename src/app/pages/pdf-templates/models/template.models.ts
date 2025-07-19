export interface Template {
  id?: string;
  name: string;
  pageSize: string;
  header: TemplateElement[];
  footer: TemplateElement[];
  watermark: Watermark;
  content?: string;
}

export interface TemplateElement {
  type: string;
  content: string;
  styles: TemplateStyles;
}

export interface TemplateStyles {
  width: number | null;
  height: number;
}

export interface Watermark {
  image: string;
  opacity: number;
  width: number;
  height: number;
}
