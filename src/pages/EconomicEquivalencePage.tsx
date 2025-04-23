import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import {
  calculatePresentValue,
  calculateFutureValue,
  calculateAnnualWorth
} from '../utils/calculators';
import { DollarSign, Percent, Clock, ArrowRightLeft } from 'lucide-react';

type CalculationType = 'present-value' | 'future-value' | 'annual-worth';

interface CalculationOption {
  value: CalculationType;
  label: string;
}

const calculationOptions: CalculationOption[] = [
  { value: 'present-value', label: 'Present Value (PV)' },
  { value: 'future-value', label: 'Future Value (FV)' },
  { value: 'annual-worth', label: 'Annual Worth (AW)' },
];

const EconomicEquivalencePage: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('present-value');
  const [amount, setAmount] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8);
  const [time, setTime] = useState<number>(5);
  const [result, setResult] = useState<number>(0);
  
  // Calculate based on selected type
  useEffect(() => {
    switch (calculationType) {
      case 'present-value':
        // Assuming amount is future value in this case
        setResult(calculatePresentValue(amount, rate, time));
        break;
      case 'future-value':
        // Assuming amount is present value in this case
        setResult(calculateFutureValue(amount, rate, time));
        break;
      case 'annual-worth':
        // Assuming amount is present value in this case
        setResult(calculateAnnualWorth(amount, rate, time));
        break;
    }
  }, [calculationType, amount, rate, time]);
  
  const handleCalculationTypeChange = (value: string) => {
    setCalculationType(value as CalculationType);
  };
  
  return (
    <div className="space-y-8 animate-fade-in mt-7">
      <div className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Economic Equivalence Calculator</h1>
        <p className="opacity-90">
          Convert between different time-value-of-money measures to compare financial alternatives.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Calculation Parameters</h2>
          
          <Select
            id="calculationType"
            label="Calculation Type"
            options={calculationOptions}
            value={calculationType}
            onChange={handleCalculationTypeChange}
          />
          
          <Input
            id="amount"
            label={getAmountLabel(calculationType)}
            type="number"
            value={amount.toString()}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            min="0"
            step="100"
            icon={<DollarSign className="h-4 w-4" />}
            helperText={getAmountHelperText(calculationType)}
          />
          
          <Input
            id="rate"
            label="Interest Rate (%)"
            type="number"
            value={rate.toString()}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.1"
            icon={<Percent className="h-4 w-4" />}
          />
          
          <Input
            id="time"
            label="Time Period (years)"
            type="number"
            value={time.toString()}
            onChange={(e) => setTime(parseFloat(e.target.value) || 0)}
            min="0"
            step="1"
            icon={<Clock className="h-4 w-4" />}
          />
          
          <Button
            variant="primary"
            fullWidth
            className="mt-4"
          >
            Calculate
          </Button>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Results</h2>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mr-4">
                <ArrowRightLeft className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{getResultLabel(calculationType)}</h3>
                <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
                  NPR {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {getResultExplanation(calculationType, amount, result, rate, time)}
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Conversion Methods</h3>
              <div className="grid grid-cols-1 gap-3">
                {calculationOptions.map((option) => (
                  option.value !== calculationType && (
                    <div 
                      key={option.value}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => setCalculationType(option.value)}
                    >
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{option.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getConversionDescription(calculationType, option.value)}
                        </p>
                      </div>
                      <ArrowRightLeft className="h-5 w-5 text-gray-400" />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Understanding Economic Equivalence</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Economic equivalence is a concept that allows you to compare different cash flows that occur at different times. 
            It acknowledges that money has a time value - a dollar today is worth more than a dollar in the future.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800 dark:text-white">Present Value (PV)</h3>
              <p className="text-sm">The current worth of a future sum of money at a specified rate of return.</p>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded text-center text-sm">
                PV = FV / (1 + r)<sup>n</sup>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800 dark:text-white">Future Value (FV)</h3>
              <p className="text-sm">The value of an asset or cash at a specified date in the future.</p>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded text-center text-sm">
                FV = PV × (1 + r)<sup>n</sup>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800 dark:text-white">Annual Worth (AW)</h3>
              <p className="text-sm">The equivalent annual cash flow for a present or future value.</p>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-600 rounded text-center text-sm">
                AW = PV × [r(1 + r)<sup>n</sup>] / [(1 + r)<sup>n</sup> - 1]
              </div>
            </div>
          </div>
          
          <p>
            These conversions allow engineers and financial analysts to compare different investment alternatives 
            on an equal basis, regardless of when the cash flows occur.
          </p>
        </div>
      </Card>
    </div>
  );
};

// Helper functions
function getAmountLabel(type: CalculationType): string {
  switch (type) {
    case 'present-value':
      return 'Future Value Amount';
    case 'future-value':
      return 'Present Value Amount';
    case 'annual-worth':
      return 'Present Value Amount';
    default:
      return 'Amount';
  }
}

function getAmountHelperText(type: CalculationType): string {
  switch (type) {
    case 'present-value':
      return 'The future amount you want to find the present value of';
    case 'future-value':
      return 'The present amount you want to find the future value of';
    case 'annual-worth':
      return 'The present value to convert to equivalent annual payments';
    default:
      return '';
  }
}

function getResultLabel(type: CalculationType): string {
  switch (type) {
    case 'present-value':
      return 'Present Value (PV)';
    case 'future-value':
      return 'Future Value (FV)';
    case 'annual-worth':
      return 'Annual Worth (AW)';
    default:
      return 'Result';
  }
}

function getResultExplanation(
  type: CalculationType,
  amount: number,
  result: number,
  rate: number,
  time: number
): string {
  switch (type) {
    case 'present-value':
      return `A future amount of NPR ${amount.toLocaleString()} in ${time} years has a present value of $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} at a ${rate}% interest rate.`;
    case 'future-value':
      return `A present amount of NPR ${amount.toLocaleString()} will grow to $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in ${time} years at a ${rate}% interest rate.`;
    case 'annual-worth':
      return `A present value of NPR ${amount.toLocaleString()} is equivalent to ${time} annual payments of $${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} at a ${rate}% interest rate.`;
    default:
      return '';
  }
}

function getConversionDescription(from: CalculationType, to: CalculationType): string {
  if (from === 'present-value' && to === 'future-value') {
    return 'Convert present value to future value';
  } else if (from === 'present-value' && to === 'annual-worth') {
    return 'Convert present value to equivalent annual payments';
  } else if (from === 'future-value' && to === 'present-value') {
    return 'Convert future value to present value';
  } else if (from === 'future-value' && to === 'annual-worth') {
    return 'Convert future value to equivalent annual payments';
  } else if (from === 'annual-worth' && to === 'present-value') {
    return 'Convert annual payments to present value';
  } else if (from === 'annual-worth' && to === 'future-value') {
    return 'Convert annual payments to future value';
  } else {
    return '';
  }
}

export default EconomicEquivalencePage;