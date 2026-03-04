/**
 * Nutrition and health calculation utilities
 */

export interface DailyNutritionalNeeds {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface BMIResult {
  bmi: number;
  category: "Underweight" | "Normal" | "Overweight" | "Obese";
  color: string;
}

/**
 * Calculate daily caloric needs using modified Harris-Benedict equation
 */
export function calculateDailyCalories(
  weight: number, // kg
  height: number, // cm
  age: number,
  sex: "male" | "female",
  activityLevel: "sedentary" | "light" | "moderate" | "active" = "moderate"
): number {
  let bmr: number;

  if (sex === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
}

/**
 * Get daily macronutrient recommendations based on activity level
 */
export function getDailyMacros(dailyCalories: number): DailyNutritionalNeeds {
  return {
    calories: dailyCalories,
    protein: Math.round(dailyCalories * 0.25 / 4), // 25% of calories, 4 cal/g
    carbs: Math.round(dailyCalories * 0.45 / 4), // 45% of calories
    fat: Math.round(dailyCalories * 0.3 / 9), // 30% of calories, 9 cal/g
    fiber: 30, // WHO recommendation
  };
}

/**
 * Calculate BMI and health category
 */
export function calculateBMI(weight: number, height: number): BMIResult {
  // height should be in cm, convert to m
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category: "Underweight" | "Normal" | "Overweight" | "Obese";
  let color: string;

  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-blue-500";
  } else if (bmi < 25) {
    category = "Normal";
    color = "text-green-500";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "text-yellow-500";
  } else {
    category = "Obese";
    color = "text-red-500";
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    color,
  };
}

/**
 * Calculate percentage of daily intake
 */
export function calculatePercentageOfDaily(
  actual: number,
  recommended: number
): number {
  return Math.round((actual / recommended) * 100);
}

/**
 * Get carbon budget status
 */
export function getCarbonBudgetStatus(co2: number, budget: number = 2.5): {
  percentage: number;
  status: "low" | "moderate" | "high" | "exceeded";
  color: string;
} {
  const percentage = (co2 / budget) * 100;

  let status: "low" | "moderate" | "high" | "exceeded";
  let color: string;

  if (percentage < 50) {
    status = "low";
    color = "bg-green-500";
  } else if (percentage < 80) {
    status = "moderate";
    color = "bg-yellow-500";
  } else if (percentage < 100) {
    status = "high";
    color = "bg-orange-500";
  } else {
    status = "exceeded";
    color = "bg-red-500";
  }

  return {
    percentage: Math.round(percentage),
    status,
    color,
  };
}

/**
 * Format nutrition label for display
 */
export function formatNutritionLabel(
  actual: number,
  recommended: number,
  unit: string
): string {
  const percentage = calculatePercentageOfDaily(actual, recommended);
  return `${actual.toFixed(1)}${unit} (${percentage}% DV)`;
}

/**
 * Get health score for a meal based on nutrients
 */
export function getMealHealthScore(
  calories: number,
  protein: number,
  fiber: number,
  targetCalories: number,
  targetProtein: number
): number {
  let score = 50; // Base score

  // Protein score
  const proteinRatio = (protein / targetProtein) * 100;
  if (proteinRatio >= 80 && proteinRatio <= 120) score += 20;
  else if (proteinRatio >= 50 && proteinRatio <= 150) score += 10;

  // Calorie score
  const calorieRatio = (calories / targetCalories) * 100;
  if (calorieRatio >= 80 && calorieRatio <= 110) score += 20;
  else if (calorieRatio >= 60 && calorieRatio <= 130) score += 10;

  // Fiber score
  if (fiber >= 25) score += 10;
  else if (fiber >= 15) score += 5;

  return Math.min(score, 100);
}
