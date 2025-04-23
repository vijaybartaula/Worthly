import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import NPVChart from '../components/charts/NPVChart';
import { calculateNPV } from '../utils/calculators';
import { DollarSign, Percent, Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';

const NPVPage: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000);
  const [discountRate, setDiscountRate] = useState<number>(10);
  const [cashFlows, setCashFlows] = useState<number[]>([300000, 400000, 500000, 600000, 700000]);
  const [npv, setNpv] = useState<number>(0);
  const [discountedCashFlows, setDiscountedCashFlows] = useState<number[]>([]);
  const [cashFlowPeriods, setCashFlowPeriods] = useState<number>(5);
  
  // Calculate NPV when inputs change
  useEffect(() => {
    // Ensure we have the correct number of cash flows
    const adjustedCashFlows = [...cashFlows];
    if (adjustedCashFlows.length !== cashFlowPeriods) {
      if (adjustedCashFlows.length < cashFlowPeriods) {
        // Add new cash flows
        for (let i = adjustedCashFlows.length; i < cashFlowPeriods; i++) {
          adjustedCashFlows.push(3000);
        }
      } else {
        // Remove excess cash flows
        adjustedCashFlows.splice(cashFlowPeriods);
      }
      setCashFlows(adjustedCashFlows);
    }
    
    // Calculate NPV and discounted cash flows
    const calculatedNpv = calculateNPV(initialInvestment, adjustedCashFlows, discountRate);
    setNpv(calculatedNpv);
    
    // Calculate discounted cash flows for the chart
    const discounted = adjustedCashFlows.map((cf, index) => {
      return cf / Math.pow(1 + discountRate / 100, index + 1);
    });
    setDiscountedCashFlows(discounted);
  }, [initialInvestment, discountRate, cashFlows, cashFlowPeriods]);
  
  // Handle changing the number of cash flow periods
  const handleCashFlowPeriodsChange = (newValue: number) => {
    setCashFlowPeriods(Math.max(1, Math.min(20, newValue)));
  };
  
  // Handle changing a specific cash flow value
  const handleCashFlowChange = (index: number, value: number) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };
  
  // Add one more cash flow period
  const addCashFlowPeriod = () => {
    if (cashFlowPeriods < 20) {
      setCashFlowPeriods(cashFlowPeriods + 1);
    }
  };
  
  // Remove one cash flow period
  const removeCashFlowPeriod = () => {
    if (cashFlowPeriods > 1) {
      setCashFlowPeriods(cashFlowPeriods - 1);
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in mt-7">
      <div className="bg-gradient-to-r from-primary-700 to-secondary-700 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Net Present Value (NPV) Calculator</h1>
        <p className="opacity-90">
          Evaluate investment opportunities by calculating the present value of future cash flows.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Initial Parameters</h2>
            
            <Input
              id="initialInvestment"
              label="Initial Investment"
              type="number"
              value={initialInvestment.toString()}
              onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
              min="0"
              step="100"
              icon={<DollarSign className="h-4 w-4" />}
            />
            
            <Input
              id="discountRate"
              label="Discount Rate (%)"
              type="number"
              value={discountRate.toString()}
              onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
              icon={<Percent className="h-4 w-4" />}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Cash Flow Periods: {cashFlowPeriods}</div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeCashFlowPeriod}
                  disabled={cashFlowPeriods <= 1}
                  icon={<Minus className="h-4 w-4" />}
                >
                  Remove
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCashFlowPeriod}
                  disabled={cashFlowPeriods >= 20}
                  icon={<Plus className="h-4 w-4" />}
                >
                  Add
                </Button>
              </div>
            </div>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Cash Flows</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {cashFlows.map((cashFlow, index) => (
                <Input
                  key={index}
                  id={`cashFlow-${index}`}
                  label={`Year ${index + 1}`}
                  type="number"
                  value={cashFlow.toString()}
                  onChange={(e) => handleCashFlowChange(index, parseFloat(e.target.value) || 0)}
                  min="-100000"
                  step="100"
                  icon={<DollarSign className="h-4 w-4" />}
                />
              ))}
            </div>
          </Card>
        </div>
        
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">NPV Results</h2>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Present Value (NPV)</h3>
              <p className={`text-3xl font-bold ${npv >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                NPR {npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            {npv >= 0 ? (
              <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-12 w-12 text-red-600 dark:text-red-400" />
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Investment Recommendation</h3>
            <div className={`p-4 rounded-lg ${npv >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              {npv >= 0 ? (
                <p className="text-green-800 dark:text-green-200">
                  This investment has a <strong>positive NPV</strong> of NPR {npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, 
                  suggesting it could be a profitable investment opportunity.
                </p>
              ) : (
                <p className="text-red-800 dark:text-red-200">
                  This investment has a <strong>negative NPV</strong> of NPR {npv.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, 
                  suggesting it may not be a profitable investment opportunity at the given discount rate.
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Cash Flow Analysis</h3>
            <NPVChart 
              cashFlows={[...cashFlows]}
              discountedCashFlows={[...discountedCashFlows]}
            />
          </div>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Understanding Net Present Value</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Net Present Value (NPV) is a financial metric that calculates the difference between the present value of cash 
            inflows and the present value of cash outflows over a period of time.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-center">NPV = Initial Investment + Σ (Cash Flow_t / (1 + r)^t)</p>
          </div>
          <p>Where:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Cash Flow_t</strong> = Net cash flow at time t</li>
            <li><strong>r</strong> = Discount rate (in decimal)</li>
            <li><strong>t</strong> = Time period</li>
          </ul>
          <p>
            <strong>Interpreting NPV Results:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>NPV &gt; 0:</strong> The investment is expected to add value. Consider accepting it.</li>
            <li><strong>NPV = 0:</strong> The investment is expected to neither gain nor lose value. Additional criteria should be considered.</li>
            <li><strong>NPV &lt; 0:</strong> The investment is expected to lose value. Consider rejecting it.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default NPVPage;