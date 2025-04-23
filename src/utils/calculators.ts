/**
 * Calculates simple interest
 * SI = P × r × t
 */
export const calculateSimpleInterest = (
  principal: number,
  rate: number,
  time: number
): number => {
  return principal * (rate / 100) * time;
};

/**
 * Calculates compound interest
 * A = P(1 + r/n)^(nt)
 */
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number
): number => {
  const r = rate / 100;
  return principal * Math.pow(1 + r / compoundingFrequency, compoundingFrequency * time);
};

/**
 * Calculates effective interest rate
 * Effective Rate = (1 + r/n)^n - 1
 */
export const calculateEffectiveRate = (
  nominalRate: number,
  compoundingFrequency: number
): number => {
  const r = nominalRate / 100;
  return (Math.pow(1 + r / compoundingFrequency, compoundingFrequency) - 1) * 100;
};

/**
 * Calculates future value
 * FV = PV × (1 + r)^n
 */
export const calculateFutureValue = (
  presentValue: number,
  rate: number,
  time: number
): number => {
  const r = rate / 100;
  return presentValue * Math.pow(1 + r, time);
};

/**
 * Calculates present value
 * PV = FV / (1 + r)^n
 */
export const calculatePresentValue = (
  futureValue: number,
  rate: number,
  time: number
): number => {
  const r = rate / 100;
  return futureValue / Math.pow(1 + r, time);
};

/**
 * Calculates net present value
 * NPV = Initial Investment + Σ (Cash Flow_t / (1 + r)^t)
 */
export const calculateNPV = (
  initialInvestment: number,
  cashFlows: number[],
  rate: number
): number => {
  const r = rate / 100;
  
  let npv = -initialInvestment;
  
  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + r, t + 1);
  }
  
  return npv;
};

/**
 * Calculates annual worth / equivalent annual annuity
 * AW = (PV * r(1 + r)^n) / ((1 + r)^n - 1)
 */
export const calculateAnnualWorth = (
  presentValue: number,
  rate: number,
  time: number
): number => {
  const r = rate / 100;
  const numerator = presentValue * r * Math.pow(1 + r, time);
  const denominator = Math.pow(1 + r, time) - 1;
  
  return numerator / denominator;
};

/**
 * Generates timeline data for displaying in charts
 */
export const generateTimelineData = (
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number = 1
): { labels: string[]; simpleInterest: number[]; compoundInterest: number[] } => {
  const labels: string[] = [];
  const simpleInterest: number[] = [];
  const compoundInterest: number[] = [];
  
  for (let t = 0; t <= time; t++) {
    labels.push(t.toString());
    
    // Simple interest calculation for each year
    const siAmount = principal + calculateSimpleInterest(principal, rate, t);
    simpleInterest.push(siAmount);
    
    // Compound interest calculation for each year
    const ciAmount = t === 0 
      ? principal 
      : calculateCompoundInterest(principal, rate, t, compoundingFrequency);
    compoundInterest.push(ciAmount);
  }
  
  return { labels, simpleInterest, compoundInterest };
};