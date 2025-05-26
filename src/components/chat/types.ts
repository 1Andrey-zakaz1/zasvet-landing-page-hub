
export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  actions?: MessageAction[];
}

export interface MessageAction {
  type: 'navigate' | 'calculate' | 'external';
  label: string;
  data: any;
}

export interface ChatResponse {
  content: string;
  actions?: MessageAction[];
}

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  actions?: MessageAction[];
}
