
export enum ThemeMode {
  SOLARPUNK = 'SOLARPUNK',
  CYBERPUNK = 'CYBERPUNK'
}

export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Module {
  id: string;
  course_id: string;
  week_number: number;
  title: string;
  description: string;
  is_generating: boolean;
  generation_status: GenerationStatus;
  content_json?: {
    script?: string;
    keyPoints?: string[];
  };
}

export interface Asset {
  id: string;
  module_id: string;
  type: 'video' | 'handout_pdf' | 'slides_json' | 'mermaid_diag';
  storage_path: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  topic_context: string;
  creator_id: string;
  created_at: string;
}
