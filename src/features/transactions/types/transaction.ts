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
    type: "Income" | "Expense";
    amount: number | undefined;
    category: string;
    date: string;
    note?: string;
    isSelected?: boolean;
}

export interface TransactionFilters {
    type: "All" | "Income" | "Expense";
    dateRange: "all" | "today" | "month" | "custom";
    startDate: string;
    endDate: string;
    search: string;
}
