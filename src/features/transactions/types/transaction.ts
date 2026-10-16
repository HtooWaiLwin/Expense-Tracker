export const IncomeCategories = [
    "Salary",
    "Investment",
    "Freelance",
    "Gift",
    "Other",
] as const;

export const ExpenseCategories = [
    "Food & Drinks",
    "Transportation",
    "Shopping",
    "Bill",
    "Health",
    "Fitness",
    "Other",
] as const;

export interface Transaction {
    id: number;
    type: "Income" | "Expense";
    amount: number | undefined;
    category: string;
    date: string;
    note?: string;
}

export interface TransactionFilters {
    type: "All" | "Income" | "Expense";
    dateRange: "all" | "today" | "month" | "custom";
    startDate: string;
    endDate: string;
    search: string;
}
