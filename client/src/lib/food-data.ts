export type FoodCategory = 
  | "Fruits"
  | "Vegetables"
  | "Grains & Cereals"
  | "Pulses & Legumes"
  | "Dairy"
  | "Meat & Protein"
  | "Nuts & Seeds";

export type ImpactLevel = "Low" | "Medium" | "High";

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  image?: string; // We'll map mock images or icons
  co2PerServing: number; // kg CO2e
  servingSize: string; // e.g. "1 medium apple (182g)"
  servingGrams: number;
  nutrition: {
    calories: number;
    protein: number; // g
    fat: number; // g
    carbs: number; // g
    fiber: number; // g
    vitamins: string[];
  };
  seasonality: number[]; // 0-11 representing Jan-Dec
  sustainabilityNote: string;
  ecoScore: ImpactLevel;
  healthScore: ImpactLevel;
  advice: string;
}

// Helper to determine impact based on CO2
const getImpact = (co2: number): ImpactLevel => {
  if (co2 < 0.5) return "Low";
  if (co2 < 1.5) return "Medium";
  return "High";
};

// Mock Database
export const foodDatabase: FoodItem[] = [
  // FRUITS
  {
    id: "apple",
    name: "Apple",
    category: "Fruits",
    co2PerServing: 0.04,
    servingSize: "1 medium (182g)",
    servingGrams: 182,
    nutrition: { calories: 95, protein: 0.5, fat: 0.3, carbs: 25, fiber: 4.4, vitamins: ["Vit C", "Potassium"] },
    seasonality: [8, 9, 10, 11], // Sep-Dec roughly
    sustainabilityNote: "Very low carbon footprint if locally sourced.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Excellent for health and the planet."
  },
  {
    id: "banana",
    name: "Banana",
    category: "Fruits",
    co2PerServing: 0.11,
    servingSize: "1 medium (118g)",
    servingGrams: 118,
    nutrition: { calories: 105, protein: 1.3, fat: 0.4, carbs: 27, fiber: 3.1, vitamins: ["Vit B6", "Potassium", "Vit C"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Available year round mostly
    sustainabilityNote: "Transported by ship, so emissions are lower than air-freighted fruits.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Good energy source with low impact."
  },
  {
    id: "orange",
    name: "Orange",
    category: "Fruits",
    co2PerServing: 0.09,
    servingSize: "1 fruit (131g)",
    servingGrams: 131,
    nutrition: { calories: 62, protein: 1.2, fat: 0.2, carbs: 15, fiber: 3.1, vitamins: ["Vit C", "Folate"] },
    seasonality: [11, 0, 1, 2, 3], // Winter
    sustainabilityNote: "Low water footprint compared to other juices.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Great immunity booster."
  },
  {
    id: "berries",
    name: "Mixed Berries",
    category: "Fruits",
    co2PerServing: 0.15,
    servingSize: "1 cup (150g)",
    servingGrams: 150,
    nutrition: { calories: 80, protein: 1, fat: 0.5, carbs: 17, fiber: 6, vitamins: ["Vit C", "Antioxidants"] },
    seasonality: [5, 6, 7, 8], // Summer
    sustainabilityNote: "Avoid air-freighted berries out of season.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Superfood! Eat seasonally."
  },

  // VEGETABLES
  {
    id: "spinach",
    name: "Spinach",
    category: "Vegetables",
    co2PerServing: 0.05,
    servingSize: "1 cup raw (30g)",
    servingGrams: 30,
    nutrition: { calories: 7, protein: 0.9, fat: 0.1, carbs: 1.1, fiber: 0.7, vitamins: ["Vit A", "Vit K", "Iron"] },
    seasonality: [2, 3, 4, 5, 9, 10], // Spring/Fall
    sustainabilityNote: "Very low impact. Grows quickly.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Nutrient dense and eco-friendly."
  },
  {
    id: "potato",
    name: "Potato",
    category: "Vegetables",
    co2PerServing: 0.03,
    servingSize: "1 medium (173g)",
    servingGrams: 173,
    nutrition: { calories: 161, protein: 4.3, fat: 0.2, carbs: 37, fiber: 3.8, vitamins: ["Vit C", "Vit B6", "Potassium"] },
    seasonality: [7, 8, 9, 10, 11], // Late summer/fall
    sustainabilityNote: "Extremely efficient crop to grow with low water usage.",
    ecoScore: "Low",
    healthScore: "Medium",
    advice: "Sustainable staple. Keep skin on for fiber."
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetables",
    co2PerServing: 0.18, // Hothouse can be higher
    servingSize: "1 medium (123g)",
    servingGrams: 123,
    nutrition: { calories: 22, protein: 1.1, fat: 0.2, carbs: 4.8, fiber: 1.5, vitamins: ["Vit C", "Lycopene"] },
    seasonality: [6, 7, 8, 9], // Summer
    sustainabilityNote: "Greenhouse tomatoes have higher footprint than field-grown.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Best eaten locally in summer."
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "Vegetables",
    co2PerServing: 0.12,
    servingSize: "1 cup chopped (91g)",
    servingGrams: 91,
    nutrition: { calories: 31, protein: 2.5, fat: 0.3, carbs: 6, fiber: 2.4, vitamins: ["Vit C", "Vit K"] },
    seasonality: [9, 10, 11, 0, 1, 2, 3], // Cool season
    sustainabilityNote: "Moderate water use, but good yield.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Cancer-fighting properties."
  },

  // GRAINS
  {
    id: "rice",
    name: "Rice (White)",
    category: "Grains & Cereals",
    co2PerServing: 0.60, // High methane
    servingSize: "1 cup cooked (158g)",
    servingGrams: 158,
    nutrition: { calories: 205, protein: 4.3, fat: 0.4, carbs: 45, fiber: 0.6, vitamins: ["B Vitamins"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Stored
    sustainabilityNote: "Rice paddies emit significant methane (greenhouse gas).",
    ecoScore: "Medium",
    healthScore: "Medium",
    advice: "High impact for a plant. Consider alternatives."
  },
  {
    id: "oats",
    name: "Oats",
    category: "Grains & Cereals",
    co2PerServing: 0.18,
    servingSize: "1/2 cup dry (40g)",
    servingGrams: 40,
    nutrition: { calories: 150, protein: 5, fat: 3, carbs: 27, fiber: 4, vitamins: ["Manganese", "Phosphorus"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "Great crop for soil health.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Excellent breakfast choice."
  },

  // PULSES
  {
    id: "lentils",
    name: "Lentils",
    category: "Pulses & Legumes",
    co2PerServing: 0.05,
    servingSize: "1 cup cooked (198g)",
    servingGrams: 198,
    nutrition: { calories: 230, protein: 18, fat: 0.8, carbs: 40, fiber: 16, vitamins: ["Iron", "Folate"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "Nitrogen-fixing crop that improves soil quality.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Super sustainable protein source."
  },
  {
    id: "chickpeas",
    name: "Chickpeas",
    category: "Pulses & Legumes",
    co2PerServing: 0.06,
    servingSize: "1 cup cooked (164g)",
    servingGrams: 164,
    nutrition: { calories: 269, protein: 14.5, fat: 4, carbs: 45, fiber: 12.5, vitamins: ["Manganese", "Folate"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "Low water footprint.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Great for hummus and curries."
  },

  // DAIRY & MEAT
  {
    id: "beef",
    name: "Beef",
    category: "Meat & Protein",
    co2PerServing: 6.61, // Very High
    servingSize: "3 oz (85g)",
    servingGrams: 85,
    nutrition: { calories: 213, protein: 22, fat: 13, carbs: 0, fiber: 0, vitamins: ["B12", "Iron", "Zinc"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "Highest carbon footprint of all foods due to methane and land use.",
    ecoScore: "High",
    healthScore: "Medium",
    advice: "Limit consumption for health and planet."
  },
  {
    id: "chicken",
    name: "Chicken",
    category: "Meat & Protein",
    co2PerServing: 0.58,
    servingSize: "3 oz (85g)",
    servingGrams: 85,
    nutrition: { calories: 122, protein: 23, fat: 3, carbs: 0, fiber: 0, vitamins: ["B6", "Niacin"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "Lower impact than red meat, but requires significant grain feed.",
    ecoScore: "Medium",
    healthScore: "Medium",
    advice: "Better choice than beef."
  },
  {
    id: "cheese",
    name: "Cheese (Cheddar)",
    category: "Dairy",
    co2PerServing: 1.15,
    servingSize: "1.5 oz (42g)",
    servingGrams: 42,
    nutrition: { calories: 170, protein: 10, fat: 14, carbs: 1, fiber: 0, vitamins: ["Calcium", "Vit A"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "High impact due to dairy cows (methane) and processing.",
    ecoScore: "High",
    healthScore: "Medium",
    advice: "Enjoy in moderation."
  },
  {
    id: "milk",
    name: "Milk (Dairy)",
    category: "Dairy",
    co2PerServing: 0.76,
    servingSize: "1 cup (244g)",
    servingGrams: 244,
    nutrition: { calories: 149, protein: 8, fat: 8, carbs: 12, fiber: 0, vitamins: ["Calcium", "Vit D"] },
    seasonality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    sustainabilityNote: "High water usage and methane emissions.",
    ecoScore: "Medium",
    healthScore: "Medium",
    advice: "Plant milks are generally more eco-friendly."
  },

  // NUTS
  {
    id: "almonds",
    name: "Almonds",
    category: "Nuts & Seeds",
    co2PerServing: 0.05, // Carbon negative often, but high water
    servingSize: "1 oz (28g)",
    servingGrams: 28,
    nutrition: { calories: 164, protein: 6, fat: 14, carbs: 6, fiber: 3.5, vitamins: ["Vit E", "Magnesium"] },
    seasonality: [8, 9, 10], // Harvest
    sustainabilityNote: "Trees sequester carbon, but require high water in drought areas.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Nutrient dense energy."
  },
  {
    id: "walnuts",
    name: "Walnuts",
    category: "Nuts & Seeds",
    co2PerServing: 0.04,
    servingSize: "1 oz (28g)",
    servingGrams: 28,
    nutrition: { calories: 185, protein: 4, fat: 18, carbs: 4, fiber: 2, vitamins: ["Omega-3", "B6"] },
    seasonality: [9, 10],
    sustainabilityNote: "Excellent tree crop for carbon sequestration.",
    ecoScore: "Low",
    healthScore: "High",
    advice: "Great for brain health."
  }
];

export const getAllCategories = (): FoodCategory[] => [
  "Fruits", "Vegetables", "Grains & Cereals", "Pulses & Legumes", "Dairy", "Meat & Protein", "Nuts & Seeds"
];
