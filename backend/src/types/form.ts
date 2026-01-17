export type FieldType = 'text' | 'number' | 'select';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}