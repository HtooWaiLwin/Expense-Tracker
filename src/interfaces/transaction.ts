export const IncomeCategories = ["Salary", "Investment", "Other"] as const;

export const ExpenseCategories = [
    "Food & Drinks",
    "Transportation",
    "Shopping",
    "Bill",
    "Other",
] as const;

export interface Transaction {
    id: number;
    type: string;
    amount: number | undefined;
    category: string;
    date: string;
    note?: string;
    isSelected?: boolean;
}
