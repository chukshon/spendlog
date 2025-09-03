import { CategoryType, ExpenseCategoriesType } from "@/types";
import * as Icons from "phosphor-react-native";

export const expenseCategories: ExpenseCategoriesType = {
  groceries: {
    label: "Groceries",
    value: "groceries",
    icon: Icons.ShoppingCartIcon,
    bgColor: "#4B5563",
  },
  rent: {
    label: "Rent",
    value: "rent",
    icon: Icons.HouseIcon,
    bgColor: "#075985",
  },
  utilities: {
    label: "Utilities",
    value: "utilities",
    icon: Icons.LightbulbIcon,
    bgColor: "#ca8a04",
  },
  transportation: {
    label: "Transportation",
    value: "transportation",
    icon: Icons.CarIcon,
    bgColor: "#b45309",
  },
  entertainment: {
    label: "Entertainment",
    value: "entertainment",
    icon: Icons.FilmStripIcon,
    bgColor: "#0f766e",
  },
  dining: {
    label: "Dining",
    value: "dining",
    icon: Icons.ForkKnifeIcon,
    bgColor: "#be185d",
  },
  health: {
    label: "Health",
    value: "health",
    icon: Icons.HeartIcon,
    bgColor: "#e11d48",
  },
  insurance: {
    label: "Insurance",
    value: "insurance",
    icon: Icons.ShieldIcon,
    bgColor: "#404040",
  },
  savings: {
    label: "Savings",
    value: "savings",
    icon: Icons.PiggyBankIcon,
    bgColor: "#065F46",
  },
  clothing: {
    label: "Clothing",
    value: "clothing",
    icon: Icons.TShirtIcon,
    bgColor: "#7C3AED",
  },
  personal: {
    label: "Personal",
    value: "personal",
    icon: Icons.UserIcon,
    bgColor: "#A21CAF",
  },
  others: {
    label: "Others",
    value: "others",
    icon: Icons.DotsThreeOutlineIcon,
    bgColor: "#525252",
  },
};

export const incomeCategory: CategoryType = {
  label: "Income",
  value: "income",
  icon: Icons.CurrencyDollarSimpleIcon,
  bgColor: "#16a34a",
};

export const transactionTypes = [
  {
    label: "Income",
    value: "income",
  },
  {
    label: "Expense",
    value: "expense",
  },
];
