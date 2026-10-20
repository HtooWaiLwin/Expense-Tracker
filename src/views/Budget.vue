<script setup lang="ts">
import { ref, computed } from "vue";

import type { Budget } from "@/features/budget/types/budget";
import AddBudgetForm from "@/features/budget/components/AddBudgetForm.vue";
import { useBudgets } from "@/features/budget/composables/useBudgetStats";
import BudgetList from "@/features/budget/components/BudgetList.vue";
import { useTransactions } from "@/features/transactions/composables/useTransactions";
import Summary from "@/features/budget/components/Summary.vue";

const showForm = ref(false);
const edit = ref(false);

const { updateBudget, addBudget, removeBudget, budgets } = useBudgets();
const { transactions } = useTransactions();

const defaultBudget = ref<Budget>({
    id: 0,
    amount: undefined,
    category: "",
});

const editBudget = ref<Budget>({
    id: 0,
    amount: undefined,
    category: "",
});

// Calculate spending for each budget from expense transactions
const budgetsWithSpending = computed(() =>
    budgets.value.map((budget) => {
        const spent = transactions.value
            .filter(
                (transaction) =>
                    transaction.type === "Expense" &&
                    transaction.category === budget.category,
            )
            .reduce(
                (total, transaction) => total + Number(transaction.amount || 0),
                0,
            );

        return {
            ...budget,
            spent,
        };
    }),
);

const openForm = () => {
    edit.value = false;
    editBudget.value = { ...defaultBudget.value };
    showForm.value = true;
};

const editForm = (budget: Budget) => {
    editBudget.value = { ...budget };
    edit.value = true;
    showForm.value = true;
};

const closeForm = () => {
    showForm.value = false;
};

const handleSaveBudget = (budget: Budget) => {
    if (edit.value) {
        updateBudget(budget);
    } else {
        addBudget(budget);
    }

    closeForm();
};

function deleteBudget(budget: Budget) {
    removeBudget(budget.id);
}
</script>

<template>
    <main class="min-h-screen space-y-6 bg-slate-50 p-5 sm:p-8">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <header
                class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900">
                        Budget
                    </h1>
                    <!--
                    <p class="mt-2 text-sm text-gray-500"></p>-->
                </div>

                <button
                    type="button"
                    @click="openForm"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span class="text-lg leading-none">+</span>
                    Add Budget
                </button>
            </header>
            <AddBudgetForm
                :show-budget-form="showForm"
                :budget="edit ? editBudget : defaultBudget"
                :budgets="budgets"
                :edit="edit"
                @close="closeForm"
                @add="handleSaveBudget"
            />
        </div>
        <Summary :budgets="budgetsWithSpending" />

        <BudgetList
            :budgets="budgetsWithSpending"
            @edit="editForm"
            @delete="deleteBudget"
        />
    </main>
</template>
