import type { Transaction } from "@/interfaces/transaction";
import { ref, watch } from "vue";

const key = "transaction_list";
localStorage.removeItem(key);
const saved = localStorage.getItem(key);
export const transactions = ref<Transaction[]>(saved ? JSON.parse(saved) : []);

let nextId =
    transactions.value.length > 0
        ? Math.max(...transactions.value.map((t) => t.id)) + 1
        : 1;

watch(
    transactions,
    (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
    },
    { deep: true },
);

export function addTransaction(transaction: Transaction) {
    transactions.value.push({
        ...transaction,
        id: nextId++,
    });
}

export function removeTransaction(index: number) {
    if (index < 0 || index >= transactions.value.length) return;

    transactions.value.splice(index, 1);
}
