<script setup lang="ts">
import type { Budget } from "../types/budget";
import { ref } from "vue";
import BudgetConfirmBox from "./BudgetConfirmBox.vue";

interface BudgetItem extends Budget {
    spent: number;
}

const props = defineProps<{
    budgets: BudgetItem[];
}>();

const emit = defineEmits<{
    edit: [budget: Budget];
    delete: [budget: Budget];
}>();

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

const getSpent = (budget: BudgetItem) => budget.spent ?? 0;

const getRemaining = (budget: BudgetItem) =>
    Math.max(Number(budget.amount) - budget.spent, 0);

const getOverBudget = (budget: BudgetItem) =>
    Math.max(budget.spent - Number(budget.amount), 0);

const getPercentage = (budget: BudgetItem) => {
    const limit = Number(budget.amount);
    const spent = Number(budget.spent ?? 0);

    if (limit <= 0) {
        return spent > 0 ? 100 : 0;
    }

    return Math.min((spent / limit) * 100, 100);
};

const showDeleteConfirm = ref(false);
const selectedBudget = ref<BudgetItem | null>(null);

const handleDelete = (budget: BudgetItem) => {
    selectedBudget.value = budget;
    showDeleteConfirm.value = true;
};

const cancelDelete = () => {
    showDeleteConfirm.value = false;
    selectedBudget.value = null;
};

const confirmDelete = () => {
    if (!selectedBudget.value) return;

    emit("delete", selectedBudget.value);

    showDeleteConfirm.value = false;
    selectedBudget.value = null;
};
</script>

<template>
    <section class="space-y-5">
        <!-- Header -->
        <div
            class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
            <div>
                <h2 class="text-xl font-bold text-gray-900">Your Budgets</h2>
                <p class="mt-1 text-sm text-gray-500">
                    Manage your category spending limits.
                </p>
            </div>

            <div class="text-sm text-gray-500">
                {{ budgets.length }}
                {{ budgets.length === 1 ? "budget" : "budgets" }}
            </div>
        </div>

        <!-- Empty state -->
        <div
            v-if="budgets.length === 0"
            class="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center"
        >
            <div class="text-4xl">💰</div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">
                No budgets yet
            </h3>
            <p class="mt-1 text-sm text-gray-500">
                Create a budget to start tracking your spending.
            </p>
        </div>

        <!-- Budget list -->
        <div v-else class="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <article
                v-for="budget in budgets"
                :key="budget.id"
                class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
            >
                <!-- Category and actions -->
                <div class="flex items-start justify-between gap-3">
                    <div class="flex min-w-0 items-center gap-3">
                        <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl"
                        >
                            💳
                        </div>

                        <div class="min-w-0">
                            <h3 class="truncate font-semibold text-gray-900">
                                {{ budget.category }}
                            </h3>

                            <p class="mt-1 text-xs text-gray-500">
                                Category budget
                            </p>
                        </div>
                    </div>

                    <div class="flex shrink-0 items-center gap-1">
                        <button
                            type="button"
                            class="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Edit budget"
                            title="Edit budget"
                            @click="emit('edit', budget)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l2.651 2.651M4 20l4.5-1 11.013-11.013a1.875 1.875 0 00-2.652-2.652L5.85 16.35 4 20z"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            class="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Delete budget"
                            title="Delete budget"
                            @click="handleDelete(budget)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 7h12m-10 0V5h8v2m-9 0l1 13h8l1-13M10 11v5m4-5v5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Amounts -->
                <div class="mt-6 flex items-end justify-between gap-3">
                    <div>
                        <p class="text-sm text-gray-500">Spent</p>
                        <p class="mt-1 text-xl font-bold text-gray-900">
                            {{ formatCurrency(getSpent(budget)) }}
                        </p>
                    </div>

                    <div class="text-right">
                        <p class="text-sm text-gray-500">Budget limit</p>
                        <p class="mt-1 font-semibold text-gray-900">
                            {{ formatCurrency(Number(budget.amount)) }}
                        </p>
                    </div>
                </div>

                <!-- Progress bar -->
                <div
                    class="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100"
                    role="progressbar"
                    :aria-valuenow="getPercentage(budget)"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :aria-label="`${budget.category} budget usage`"
                >
                    <div
                        class="h-full rounded-full transition-all duration-300"
                        :class="
                            getOverBudget(budget) > 0
                                ? 'bg-red-500'
                                : getPercentage(budget) >= 80
                                  ? 'bg-amber-500'
                                  : 'bg-blue-600'
                        "
                        :style="{
                            width: `${getPercentage(budget)}%`,
                        }"
                    />
                </div>

                <!-- Remaining / exceeded -->
                <div
                    class="mt-3 flex items-center justify-between gap-3 text-sm"
                >
                    <span
                        :class="
                            getOverBudget(budget) > 0
                                ? 'font-medium text-red-600'
                                : 'text-gray-500'
                        "
                    >
                        {{
                            getOverBudget(budget) > 0
                                ? `${formatCurrency(getOverBudget(budget))} over budget`
                                : `${formatCurrency(getRemaining(budget))} remaining`
                        }}
                    </span>

                    <span
                        :class="
                            getOverBudget(budget) > 0
                                ? 'font-semibold text-red-600'
                                : 'font-medium text-gray-600'
                        "
                    >
                        {{ getPercentage(budget).toFixed(0) }}%
                    </span>
                </div>
            </article>
        </div>
        <BudgetConfirmBox
            :show="showDeleteConfirm"
            :category="selectedBudget?.category"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        />
    </section>
</template>
