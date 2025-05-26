
import { catalogData } from '../catalog/catalogData';
import type { Fixture } from '../catalog/CatalogSection';

export interface CatalogSearchResult {
  fixtures: Fixture[];
  total: number;
  searchQuery: string;
  isApproximate?: boolean;
}

// Функция для извлечения числовых значений из текста
const extractNumbers = (text: string): number[] => {
  const numbers = text.match(/\d+/g);
  return numbers ? numbers.map(Number) : [];
};

// Функция для проверки, попадает ли значение в диапазон 5%
const isWithinRange = (value: number, target: number, tolerance: number = 0.05): boolean => {
  const lowerBound = target * (1 - tolerance);
  const upperBound = target * (1 + tolerance);
  return value >= lowerBound && value <= upperBound;
};

// Функция для поиска приближенных совпадений
const findApproximateMatches = (query: string, limit: number): CatalogSearchResult => {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
  const queryNumbers = extractNumbers(query);
  
  const results = catalogData.filter(fixture => {
    let hasTextMatch = false;
    let hasNumberMatch = false;
    
    // Проверяем текстовые совпадения
    const searchText = `${fixture.name} ${fixture.category} ${fixture.material} ${fixture.ip_rating}`.toLowerCase();
    const textTerms = searchTerms.filter(term => isNaN(Number(term)));
    
    if (textTerms.length > 0) {
      hasTextMatch = textTerms.some(term => searchText.includes(term));
    } else {
      hasTextMatch = true; // Если нет текстовых терминов, считаем что текст подходит
    }
    
    // Проверяем числовые совпадения с допуском 5%
    if (queryNumbers.length > 0) {
      const fixtureNumbers = [
        fixture.power,
        fixture.luminous_flux,
        fixture.price,
        fixture.color_temperature,
        ...extractNumbers(fixture.dimensions),
        ...extractNumbers(fixture.ip_rating)
      ];
      
      hasNumberMatch = queryNumbers.some(queryNum => 
        fixtureNumbers.some(fixtureNum => 
          isWithinRange(fixtureNum, queryNum)
        )
      );
    } else {
      hasNumberMatch = true; // Если нет чисел в запросе, считаем что числа подходят
    }
    
    return hasTextMatch && hasNumberMatch;
  });

  // Сортируем по релевантности
  const sortedResults = results.sort((a, b) => {
    // Сначала по текстовым совпадениям в названии
    const aTextMatches = searchTerms.filter(term => 
      isNaN(Number(term)) && a.name.toLowerCase().includes(term)
    ).length;
    const bTextMatches = searchTerms.filter(term => 
      isNaN(Number(term)) && b.name.toLowerCase().includes(term)
    ).length;
    
    if (aTextMatches !== bTextMatches) {
      return bTextMatches - aTextMatches;
    }
    
    // Затем по точности числовых совпадений
    if (queryNumbers.length > 0) {
      const aNumberScore = queryNumbers.reduce((score, queryNum) => {
        const aNumbers = [a.power, a.luminous_flux, a.price];
        const closestMatch = aNumbers.reduce((closest, num) => {
          const diff = Math.abs(num - queryNum) / queryNum;
          return diff < closest ? diff : closest;
        }, Infinity);
        return score + (1 - Math.min(closestMatch, 1));
      }, 0);
      
      const bNumberScore = queryNumbers.reduce((score, queryNum) => {
        const bNumbers = [b.power, b.luminous_flux, b.price];
        const closestMatch = bNumbers.reduce((closest, num) => {
          const diff = Math.abs(num - queryNum) / queryNum;
          return diff < closest ? diff : closest;
        }, Infinity);
        return score + (1 - Math.min(closestMatch, 1));
      }, 0);
      
      if (Math.abs(aNumberScore - bNumberScore) > 0.1) {
        return bNumberScore - aNumberScore;
      }
    }
    
    // В конце по световому потоку
    return b.luminous_flux - a.luminous_flux;
  });

  return {
    fixtures: sortedResults.slice(0, limit),
    total: sortedResults.length,
    searchQuery: query,
    isApproximate: true
  };
};

export const searchCatalog = (query: string, limit: number = 5): CatalogSearchResult => {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
  
  if (searchTerms.length === 0) {
    return {
      fixtures: catalogData.slice(0, limit),
      total: catalogData.length,
      searchQuery: query
    };
  }

  // Сначала ищем точные совпадения
  const exactResults = catalogData.filter(fixture => {
    const searchText = `${fixture.name} ${fixture.category} ${fixture.material} ${fixture.ip_rating}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });

  // Если есть точные совпадения, возвращаем их
  if (exactResults.length > 0) {
    const sortedExactResults = exactResults.sort((a, b) => {
      const aMatches = searchTerms.filter(term => a.name.toLowerCase().includes(term)).length;
      const bMatches = searchTerms.filter(term => b.name.toLowerCase().includes(term)).length;
      
      if (aMatches !== bMatches) {
        return bMatches - aMatches;
      }
      
      return b.luminous_flux - a.luminous_flux;
    });

    return {
      fixtures: sortedExactResults.slice(0, limit),
      total: sortedExactResults.length,
      searchQuery: query,
      isApproximate: false
    };
  }

  // Если точных совпадений нет, ищем приближенные
  return findApproximateMatches(query, limit);
};

export const formatCatalogResponse = (searchResult: CatalogSearchResult): string => {
  const { fixtures, total, searchQuery, isApproximate } = searchResult;
  
  if (fixtures.length === 0) {
    return `По запросу "${searchQuery}" светильники не найдены. Попробуйте изменить поисковый запрос или просмотрите весь каталог.`;
  }

  let response = '';
  
  if (isApproximate) {
    response = `По запросу "${searchQuery}" точных совпадений не найдено. Показываю ${fixtures.length} ближайших вариантов (в пределах 5% отклонения):\n\n`;
  } else {
    response = `По запросу "${searchQuery}" найдено ${total} светильников. Показываю топ-${fixtures.length}:\n\n`;
  }
  
  fixtures.forEach((fixture, index) => {
    // Получаем серию (первое слово из названия)
    const series = fixture.name.split(' ')[0];
    
    response += `${index + 1}. **${fixture.name}**\n`;
    response += `   • Серия: ${series}\n`;
    response += `   • Мощность: ${fixture.power}Вт\n`;
    response += `   • Световой поток: ${fixture.luminous_flux.toLocaleString()}лм\n`;
    response += `   • IP: ${fixture.ip_rating}\n`;
    
    if (fixture.beam_angle) {
      response += `   • КСС: ${fixture.beam_angle}\n`;
    }
    
    response += `   • Габариты: ${fixture.dimensions}\n`;
    response += `   • Цена: ${fixture.price.toLocaleString()}₽\n`;
    response += `   • ${fixture.availability ? '✅ В наличии' : '❌ Под заказ'}\n\n`;
  });

  if (total > fixtures.length) {
    response += `И еще ${total - fixtures.length} похожих светильников. Для просмотра всех результатов перейдите в каталог.`;
  }

  return response;
};
