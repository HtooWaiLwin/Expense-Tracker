```vue
<script setup lang="ts">
import Summary from "@/features/dashboard/components/Summary.vue";
import Category from "@/features/dashboard/components/Category.vue";
import Recent from "@/features/dashboard/components/Recent.vue";
import { useDashboardStats } from "@/features/dashboard/composables/useDashBoardStats.ts";

const {
    income,
    expense,
    balance,
    incomeCategories,
    expenseCategories,
    recent,
    transactions,
} = useDashboardStats();
</script>

<template>
    <div class="min-h-screen space-y-6 bg-slate-50 p-5 sm:p-8">
        <header>
            <h1 class="text-2xl font-bold tracking-tight text-slate-800">
                Dashboard
            </h1>
            <p class="mt-1 text-sm text-slate-500">
                Overview of your income, expenses and balance.
            </p>
        </header>

        <Summary
            :balance="balance"
            :income="income"
            :expense="expense"
            :transactions="transactions"
        />

        <section class="grid gap-5 lg:grid-cols-2">
            <Category type="Expense" :items="expenseCategories" />
            <Category type="Income" :items="incomeCategories" />
        </section>

        <Recent :transactions="recent" />
    </div>
</template>
