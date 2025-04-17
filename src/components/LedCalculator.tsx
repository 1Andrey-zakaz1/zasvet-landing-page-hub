
import React from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalculatorForm from './calculator/CalculatorForm';
import ResultsPanel from './calculator/ResultsPanel';
import { useCalculatorState } from '@/hooks/useCalculatorState';
import CalculatorHeader from './calculator/CalculatorHeader';

const LedCalculator = () => {
  const {
    formData,
    errors,
    results,
    showResults,
    isExpanded,
    toggleForm,
    handleChange,
    handleSelectChange,
    handleSubmit,
    resetCalculator,
    collapseResults
  } = useCalculatorState();

  return (
    <section id="calculator" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор окупаемости</h2>
        
        <div className="max-w-4xl mx-auto">
          {(!results || !showResults) && (
            <CalculatorHeader 
              isExpanded={isExpanded}
              toggleForm={toggleForm}
            />
          )}
          
          {isExpanded && !showResults && (
            <CalculatorForm 
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmit}
            />
          )}
          
          {results && showResults && (
            <ResultsPanel 
              results={results}
              formData={formData}
              resetCalculator={resetCalculator}
              collapseResults={collapseResults}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LedCalculator;
