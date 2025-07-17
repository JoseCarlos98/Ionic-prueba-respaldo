export interface Template {
    id: string;
    name: string;
    pageSize: string;
    header: TemplateElement[];
    footer: TemplateElement[];
    watermark: Watermark;
    content: string;
}

export interface TemplateElement {
    type: string;
    content: string;
    styles: TemplateStyles;
}

export interface TemplateStyles {
    bold: boolean;
    italic: boolean;
    color: string;
    bullet: boolean;
    width: number;
    height: number;
}

export interface Watermark {
    image: string;   // base64 string
    opacity: number;
    width: number;
    height: number;
}
