
import type { KnowledgeItem } from './types';

// Функция для поиска ответа в базе знаний
export const findBestMatch = (userMessage: string, knowledgeBase: KnowledgeItem[]): KnowledgeItem | null => {
  const message = userMessage.toLowerCase();
  let bestMatch: KnowledgeItem | null = null;
  let maxMatches = 0;
  
  for (const item of knowledgeBase) {
    const matches = item.keywords.filter(keyword => 
      message.includes(keyword.toLowerCase())
    ).length;
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = item;
    }
  }
  
  return maxMatches > 0 ? bestMatch : null;
};
