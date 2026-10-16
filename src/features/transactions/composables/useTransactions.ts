import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { Transaction, TransactionFilters } from "../types/transaction";

const STORAGE_KEY = "transaction_list";

// Load transactions from localStorage
function loadTransactions(): Transaction[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? (JSON.parse(saved) as Transaction[]) : [];
    } catch {
        return [];
    }
}

// Shared transaction state
const transactions = ref<Transaction[]>(
    typeof localStorage !== "undefined" ? loadTransactions() : [],
);

// Save changes to localStorage
watch(
    transactions,
    (newTransactions) => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
        }
    },
    { deep: true },
);

export function useTransactions() {
    const selectedId = ref<number[]>([]);

    // Add a transaction
    function addTransaction(transaction: Transaction) {
        const nextId =
            transactions.value.length > 0
                ? Math.max(...transactions.value.map((t) => t.id)) + 1
                : 1;

        transactions.value.unshift({
            ...transaction,
            id: nextId,
        });
    }

    // Remove one transaction
    function removeTransaction(id: number) {
        const index = transactions.value.findIndex((t) => t.id === id);

        if (index !== -1) {
            transactions.value.splice(index, 1);
        }
    }

    // Remove all selected transactions
    // function removeSelectedTransactions() {
    //     transactions.value = transactions.value.filter(
    //         (transaction) => !transaction.isSelected,
    //     );
    // }

    function filterTransactions(filter: MaybeRefOrGetter<TransactionFilters>) {
        const currentFilter = toValue(filter);

        const now = new Date();
        const today = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0"),
        ].join("-");

        const currentMonth = today.slice(0, 7);

        return transactions.value.filter((transaction) => {
            const search = currentFilter.search.trim().toLowerCase();
            const matchesSearch =
                !search ||
                transaction.category.toLowerCase().includes(search) ||
                (transaction.note ?? "").toLowerCase().includes(search) ||
                transaction.type.toLowerCase().includes(search) ||
                String(transaction.amount ?? "").includes(search);

            const matchesType =
                currentFilter.type === "All" ||
                transaction.type === currentFilter.type;

            let matchesDate = true;

            switch (currentFilter.dateRange) {
                case "today":
                    matchesDate = transaction.date === today;
                    break;

                case "month":
                    matchesDate = transaction.date.slice(0, 7) === currentMonth;
                    break;

                case "custom": {
                    const { startDate, endDate } = currentFilter;

                    if (startDate) {
                        matchesDate =
                            matchesDate && transaction.date >= startDate;
                    }

                    if (endDate) {
                        matchesDate =
                            matchesDate && transaction.date <= endDate;
                    }

                    break;
                }

                case "all":
                default:
                    break;
            }

            return matchesType && matchesDate && matchesSearch;
        });
    }

    function updateTransaction(updatedTransaction: Transaction) {
        const index = transactions.value.findIndex(
            (transaction) => transaction.id === updatedTransaction.id,
        );

        const existingTransaction = transactions.value[index];

        if (existingTransaction) {
            transactions.value[index] = {
                ...updatedTransaction,
                id: existingTransaction.id,
            };
        }
    }

    return {
        transactions,
        selectedId,
        addTransaction,
        removeTransaction,
        // removeSelectedTransactions,
        filterTransactions,
        updateTransaction,
    };
}
