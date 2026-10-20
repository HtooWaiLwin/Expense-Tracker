<script setup lang="ts">
import { computed } from "vue";
import type { Budget } from "../types/budget";

interface BudgetItem extends Budget {
    spent: number;
}

const props = defineProps<{
    budgets: BudgetItem[];
}>();

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

const totalBudget = computed(() =>
    props.budgets.reduce(
        (total, budget) => total + Number(budget.amount || 0),
        0,
    ),
);

const totalSpent = computed(() =>
    props.budgets.reduce(
        (total, budget) => total + Number(budget.spent || 0),
        0,
    ),
);

const remaining = computed(() =>
    props.budgets.reduce(
        (total, budget) =>
            total +
            Math.max(Number(budget.amount || 0) - Number(budget.spent || 0), 0),
        0,
    ),
);

const overBudget = computed(() =>
    props.budgets.reduce(
        (total, budget) =>
            total +
            Math.max(Number(budget.spent || 0) - Number(budget.amount || 0), 0),
        0,
    ),
);
</script>

<template>
    <section
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Budget summary"
    >
        <!-- Total Budget -->
        <article
            class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
            <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-medium text-gray-500">Total Budget</p>
            </div>
            <p class="mt-3 text-2xl font-bold text-gray-900">
                {{ formatCurrency(totalBudget) }}
            </p>
            <p class="mt-1 text-xs text-gray-500">Across all categories</p>
        </article>

        <!-- Total Spent -->
        <article
            class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
            <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-medium text-gray-500">Total Spent</p>
            </div>
            <p class="mt-3 text-2xl font-bold text-gray-900">
                {{ formatCurrency(totalSpent) }}
            </p>
            <p class="mt-1 text-xs text-gray-500">Across all categories</p>
        </article>

        <!-- Remaining -->
        <article
            class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
            <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-medium text-gray-500">Remaining</p>
            </div>
            <p class="mt-3 text-2xl font-bold text-emerald-600">
                {{ formatCurrency(remaining) }}
            </p>
            <p class="mt-1 text-xs text-gray-500">Available within budgets</p>
        </article>

        <!-- Over Budget -->
        <article
            class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
            <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-medium text-gray-500">Over Budget</p>
            </div>
            <p class="mt-3 text-2xl font-bold text-red-600">
                {{ formatCurrency(overBudget) }}
            </p>
            <p class="mt-1 text-xs text-gray-500">
                Amount exceeding category limits
            </p>
        </article>
    </section>
</template>
