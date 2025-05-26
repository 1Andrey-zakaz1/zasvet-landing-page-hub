
import { catalogData } from '../catalog/catalogData';
import type { Fixture } from '../catalog/CatalogSection';

export interface CatalogSearchResult {
  fixtures: Fixture[];
  total: number;
  searchQuery: string;
}

export const searchCatalog = (query: string, limit: number = 5): CatalogSearchResult => {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
  
  if (searchTerms.length === 0) {
    return {
      fixtures: catalogData.slice(0, limit),
      total: catalogData.length,
      searchQuery: query
    };
  }

  const results = catalogData.filter(fixture => {
    const searchText = `${fixture.name} ${fixture.category} ${fixture.material} ${fixture.ip_rating}`.toLowerCase();
    
    // Проверяем, содержит ли текст все поисковые термины
    return searchTerms.every(term => searchText.includes(term));
  });

  // Сортируем по релевантности (количество совпадений в названии)
  const sortedResults = results.sort((a, b) => {
    const aMatches = searchTerms.filter(term => a.name.toLowerCase().includes(term)).length;
    const bMatches = searchTerms.filter(term => b.name.toLowerCase().includes(term)).length;
    
    if (aMatches !== bMatches) {
      return bMatches - aMatches;
    }
    
    // Если одинаковое количество совпадений, сортируем по световому потоку
    return b.luminous_flux - a.luminous_flux;
  });

  return {
    fixtures: sortedResults.slice(0, limit),
    total: sortedResults.length,
    searchQuery: query
  };
};

export const formatCatalogResponse = (searchResult: CatalogSearchResult): string => {
  const { fixtures, total, searchQuery } = searchResult;
  
  if (fixtures.length === 0) {
    return `По запросу "${searchQuery}" светильники не найдены. Попробуйте изменить поисковый запрос или просмотрите весь каталог.`;
  }

  let response = `По запросу "${searchQuery}" найдено ${total} светильников. Показываю топ-${fixtures.length}:\n\n`;
  
  fixtures.forEach((fixture, index) => {
    response += `${index + 1}. **${fixture.name}**\n`;
    response += `   • Мощность: ${fixture.power}Вт\n`;
    response += `   • Световой поток: ${fixture.luminous_flux.toLocaleString()}лм\n`;
    response += `   • IP: ${fixture.ip_rating}\n`;
    response += `   • Цена: ${fixture.price.toLocaleString()}₽\n`;
    if (fixture.beam_angle) {
      response += `   • КСС: ${fixture.beam_angle}\n`;
    }
    response += `   • ${fixture.availability ? '✅ В наличии' : '❌ Под заказ'}\n\n`;
  });

  if (total > fixtures.length) {
    response += `И еще ${total - fixtures.length} светильников. Для просмотра всех результатов перейдите в каталог.`;
  }

  return response;
};
