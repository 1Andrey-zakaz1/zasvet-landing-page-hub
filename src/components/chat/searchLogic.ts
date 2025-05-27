
import type { KnowledgeItem } from './types';

// Функция для поиска ответа в базе знаний с улучшенным алгоритмом
export const findBestMatch = (userMessage: string, knowledgeBase: KnowledgeItem[]): KnowledgeItem | null => {
  const message = userMessage.toLowerCase().trim();
  let bestMatch: KnowledgeItem | null = null;
  let maxScore = 0;
  
  for (const item of knowledgeBase) {
    let score = 0;
    
    // Проверяем точные совпадения ключевых слов (вес 3)
    const exactMatches = item.keywords.filter(keyword => 
      message.includes(keyword.toLowerCase())
    ).length;
    score += exactMatches * 3;
    
    // Проверяем частичные совпадения (вес 1)
    const partialMatches = item.keywords.filter(keyword => {
      const keywordLower = keyword.toLowerCase();
      return message.split(' ').some(word => 
        word.includes(keywordLower) || keywordLower.includes(word)
      );
    }).length;
    score += partialMatches * 1;
    
    // Проверяем совпадения отдельных слов из ключевых фраз (вес 2)
    const wordMatches = item.keywords.filter(keyword => {
      const keywordWords = keyword.toLowerCase().split(' ');
      const messageWords = message.split(' ');
      return keywordWords.some(keywordWord => 
        messageWords.some(messageWord => 
          keywordWord === messageWord && keywordWord.length > 2
        )
      );
    }).length;
    score += wordMatches * 2;
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }
  
  console.log(`Search for "${userMessage}": best score = ${maxScore}, found = ${bestMatch ? 'yes' : 'no'}`);
  
  return maxScore > 0 ? bestMatch : null;
};
