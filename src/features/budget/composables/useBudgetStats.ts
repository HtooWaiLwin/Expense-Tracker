import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { Budget } from "../types/budget";

const STORAGE_KEY = "Budget_list";

function loadBudget(): Budget[] {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? (JSON.parse(saved) as Budget[]) : [];
    } catch {
        return [];
    }
}

const budgets = ref<Budget[]>(
    typeof localStorage !== "undefined" ? loadBudget() : [],
);

watch(
    budgets,
    (newBudget) => {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBudget));
        }
    },
    { deep: true },
);

export function useBudgets() {
    function addBudget(budget: Budget) {
        const nextId =
            budgets.value.length > 0
                ? Math.max(...budgets.value.map((t) => t.id)) + 1
                : 1;

        budgets.value.unshift({
            ...budget,
            id: nextId,
        });
    }

    function removeBudget(id: number) {
        const index = budgets.value.findIndex((t) => t.id === id);

        if (index !== -1) {
            budgets.value.splice(index, 1);
        }
    }

    function updateBudget(updatedBudget: Budget) {
        const index = budgets.value.findIndex(
            (budget) => budget.id === updatedBudget.id,
        );

        const existingBudget = budgets.value[index];

        if (existingBudget) {
            budgets.value[index] = {
                ...updatedBudget,
                id: existingBudget.id,
            };
        }
    }

    return {
        budgets,
        addBudget,
        removeBudget,
        updateBudget,
    };
}
