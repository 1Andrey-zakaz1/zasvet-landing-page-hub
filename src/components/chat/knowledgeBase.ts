
import type { KnowledgeItem } from './types';
import { catalogKnowledge } from './knowledge/catalogKnowledge';
import { technicalKnowledge } from './knowledge/technicalKnowledge';
import { calculationKnowledge } from './knowledge/calculationKnowledge';
import { companyKnowledge } from './knowledge/companyKnowledge';

export const knowledgeBase: KnowledgeItem[] = [
  ...catalogKnowledge,
  ...technicalKnowledge,
  ...calculationKnowledge,
  ...companyKnowledge
];
