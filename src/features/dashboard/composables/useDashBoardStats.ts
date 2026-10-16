import { computed } from "vue";
import { useTransactions } from "@/features/transactions/composables/useTransactions";
import {
    IncomeCategories,
    ExpenseCategories,
} from "@/features/transactions/types/transaction";

export function useDashboardStats() {
    const { transactions } = useTransactions();

    const income = computed(() =>
        transactions.value
            .filter((t) => t.type === "Income")
            .reduce((sum, t) => sum + (Number(t.amount) || 0), 0),
    );

    const expense = computed(() =>
        transactions.value
            .filter((t) => t.type === "Expense")
            .reduce((sum, t) => sum + (Number(t.amount) || 0), 0),
    );

    const balance = computed(() => income.value - expense.value);

    const categories = (type: "Income" | "Expense") => {
        const totals: Record<string, number> = {};

        transactions.value
            .filter((t) => t.type === type)
            .forEach((t) => {
                const name = t.category || "Uncategorized";
                totals[name] = (totals[name] || 0) + (Number(t.amount) || 0);
            });

        const total = type === "Income" ? income.value : expense.value;

        return Object.entries(totals)
            .map(([name, amount]) => ({
                name,
                amount,
                percent: total ? (amount / total) * 100 : 0,
            }))
            .sort((a, b) => b.amount - a.amount);
    };

    const incomeCategories = computed(() => categories("Income"));
    const expenseCategories = computed(() => categories("Expense"));

    const recent = computed(() =>
        [...transactions.value]
            .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
            .slice(0, 5),
    );

    const totalCategories = computed(() => {
        return new Set([...IncomeCategories, ...ExpenseCategories]).size;
    });

    const topCategory = computed(() => {
        const totals: Record<string, number> = {};

        transactions.value
            .filter((t) => t.type === "Expense")
            .forEach((t) => {
                const category = t.category || "Uncategorized";
                totals[category] =
                    (totals[category] || 0) + (Number(t.amount) || 0);
            });

        const [name, amount] = Object.entries(totals).sort(
            (a, b) => b[1] - a[1],
        )[0] || ["None", 0];

        return { name, amount };
    });

    const categoryCount = computed(
        () =>
            new Set(
                transactions.value.map(
                    (t) => t.category?.trim() || "Uncategorized",
                ),
            ).size,
    );

    // const money = (amount: number) => formatMoney(amount);

    return {
        transactions,
        income,
        expense,
        balance,
        incomeCategories,
        expenseCategories,
        recent,
        totalCategories,
        categoryCount,
        topCategory,
    };
}
