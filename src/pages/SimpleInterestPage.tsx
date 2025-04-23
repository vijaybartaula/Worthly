import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import InterestChart from '../components/charts/InterestChart';
import { generateTimelineData, calculateSimpleInterest } from '../utils/calculators';
import { DollarSign, Percent, Clock } from 'lucide-react';

const SimpleInterestPage: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5);
  const [interest, setInterest] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [chartData, setChartData] = useState<{
    labels: string[];
    simpleInterest: number[];
    compoundInterest: number[];
  }>({ labels: [], simpleInterest: [], compoundInterest: [] });
  
  useEffect(() => {
    // Calculate interest and total amount
    const calculatedInterest = calculateSimpleInterest(principal, rate, time);
    const calculatedTotal = principal + calculatedInterest;
    
    setInterest(calculatedInterest);
    setTotal(calculatedTotal);
    
    // Generate data for the chart
    const timelineData = generateTimelineData(principal, rate, time);
    setChartData(timelineData);
  }, [principal, rate, time]);
  
  return (
   <div className="space-y-8 animate-fade-in mt-7">
  <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl p-6 mb-6">
    <h1 className="text-2xl font-bold mb-2">Simple Interest Calculator</h1>
    <p className="opacity-90">
      Calculate how your investments grow with a fixed interest rate over time.
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Principal</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                NPR {principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Interest Earned</h3>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                NPR {interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Amount</h3>
              <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                NPR {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Growth Over Time</h3>
            <InterestChart 
              labels={chartData.labels} 
              simpleInterestData={chartData.simpleInterest} 
              compoundInterestData={chartData.compoundInterest} 
            />
          </div>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Understanding Simple Interest</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Simple interest is calculated by multiplying the principal amount, the interest rate, and the time period.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-center">SI = P × r × t</p>
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>SI</strong> = Simple Interest</li>
            <li><strong>P</strong> = Principal amount (initial investment)</li>
            <li><strong>r</strong> = Interest rate (in decimal)</li>
            <li><strong>t</strong> = Time period (in years)</li>
          </ul>
          <p>
            Unlike compound interest, simple interest is only earned on the initial principal amount, 
            regardless of the accumulated interest over previous periods.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SimpleInterestPage;