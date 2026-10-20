export interface Budget {
    id: number;
    amount: number | undefined;
    category: string;
}
export interface BudgetForm {
    amount: number | string;
    category: string;
}
