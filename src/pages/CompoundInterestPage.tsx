import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import InterestChart from '../components/charts/InterestChart';
import { 
  calculateCompoundInterest,
  calculateEffectiveRate,
  generateTimelineData
} from '../utils/calculators';
import { DollarSign, Percent, Clock, Calculator } from 'lucide-react';

const compoundingOptions = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Semi-annually' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
  { value: '365', label: 'Daily' },
];

const CompoundInterestPage: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('1');
  const [interest, setInterest] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [chartData, setChartData] = useState<{
    labels: string[];
    simpleInterest: number[];
    compoundInterest: number[];
  }>({ labels: [], simpleInterest: [], compoundInterest: [] });
  
  useEffect(() => {
    const frequency = parseInt(compoundingFrequency);
    
    // Calculate compound interest and total amount
    const calculatedTotal = calculateCompoundInterest(principal, rate, time, frequency);
    const calculatedInterest = calculatedTotal - principal;
    
    // Calculate effective interest rate
    const calculatedEffectiveRate = calculateEffectiveRate(rate, frequency);
    
    setInterest(calculatedInterest);
    setTotal(calculatedTotal);
    setEffectiveRate(calculatedEffectiveRate);
    
    // Generate data for the chart
    const timelineData = generateTimelineData(principal, rate, time, frequency);
    setChartData(timelineData);
  }, [principal, rate, time, compoundingFrequency]);
  
  return (
    <div className="space-y-8 animate-fade-in mt-7">
      <div className="bg-gradient-to-r from-secondary-500 to-secondary-700 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Compound Interest Calculator</h1>
        <p className="opacity-90">
          See how your investments grow exponentially with compound interest.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Input Parameters</h2>
          
          <Input
            id="principal"
            label="Principal Amount"
            type="number"
            value={principal.toString()}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            min="0"
            step="100"
            icon={<DollarSign className="h-4 w-4" />}
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
          
          <Select
            id="compoundingFrequency"
            label="Compounding Frequency"
            options={compoundingOptions}
            value={compoundingFrequency}
            onChange={setCompoundingFrequency}
          />
          
          <Button
            variant="primary"
            fullWidth
            className="mt-4"
          >
            Calculate
          </Button>
        </Card>
        
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Principal</h3>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                NPR {principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Interest Earned</h3>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                NPR {interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Amount</h3>
              <p className="text-xl font-bold text-secondary-600 dark:text-secondary-400">
                NPR {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Effective Rate</h3>
              <p className="text-xl font-bold text-accent-600 dark:text-accent-400">
                {effectiveRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Growth Comparison</h3>
            <InterestChart 
              labels={chartData.labels} 
              simpleInterestData={chartData.simpleInterest} 
              compoundInterestData={chartData.compoundInterest} 
              title="Simple vs. Compound Interest"
            />
          </div>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Understanding Compound Interest</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Compound interest is calculated by applying the interest rate to both the initial principal and the 
            accumulated interest from previous periods, creating an exponential growth effect.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-center">A = P(1 + r/n)^(nt)</p>
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>A</strong> = Final amount (principal + interest)</li>
            <li><strong>P</strong> = Principal amount (initial investment)</li>
            <li><strong>r</strong> = Annual interest rate (in decimal)</li>
            <li><strong>n</strong> = Number of times interest is compounded per year</li>
            <li><strong>t</strong> = Time period (in years)</li>
          </ul>
          <p>
            The <strong>effective annual rate</strong> gives you the equivalent annual rate when taking compounding into account:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-center">Effective Rate = (1 + r/n)^n - 1</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompoundInterestPage;