export const IncomeCategories = [
    "Salary",
    "Investment",
    "Freelance",
    "Gift",
    "Other Income",
];

export const ExpenseCategories = [
    "Food & Drinks",
    "Transportation",
    "Shopping",
    "Bill",
    "Health",
    "Fitness",
    "Other Expense",
];

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

export interface TransactionForm {
    type: "Income" | "Expense";
    amount: number | string;
    date: string;
    category: string;
    note: string;
}
