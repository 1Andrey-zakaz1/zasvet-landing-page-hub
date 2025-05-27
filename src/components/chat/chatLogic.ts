
import type { ChatResponse } from './types';
import { knowledgeBase } from './knowledgeBase';
import { findBestMatch } from './searchLogic';
import { getDefaultResponse } from './defaultResponses';

// Функция обработки сообщения пользователя
export const processUserMessage = async (message: string): Promise<ChatResponse> => {
  console.log('Processing user message:', message);
  console.log('Knowledge base entries:', knowledgeBase.length);
  
  // Ищем совпадения в базе знаний
  const match = findBestMatch(message, knowledgeBase);
  
  if (match) {
    console.log('Found match for:', message);
    return {
      content: match.response,
      actions: match.actions
    };
  }
  
  console.log('No match found for:', message);
  // Если точного совпадения нет, даем общий ответ с навигацией к инструментам
  return getDefaultResponse();
};
