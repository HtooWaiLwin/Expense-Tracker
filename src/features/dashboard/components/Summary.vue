<script setup lang="ts">
import { computed } from "vue";
import { useDashboardStats } from "../composables/useDashBoardStats";
import type { Transaction } from "@/features/transactions/types/transaction";
import { money } from "@/utils/formatMoney";

const props = defineProps<{
    balance: number;
    income: number;
    expense: number;
    transactions: Transaction[];
}>();

const { totalCategories, categoryCount, topCategory } = useDashboardStats();

const cards = computed(() => [
    {
        name: "Total Balance",
        amount: money(props.balance),
        icon: "◈",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        detail: "All transactions",
    },
    {
        name: "Total Income",
        amount: money(props.income),
        icon: "↗",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        detail: "Total money received",
    },
    {
        name: "Total Expenses",
        amount: money(props.expense),
        icon: "↘",
        color: "text-rose-600",
        bg: "bg-rose-50",
        detail: "Total money spent",
    },
    {
        name: "Categories Used",
        amount: String(categoryCount.value + " of " + totalCategories.value),
        icon: "▦",
        color: "text-amber-600",
        bg: "bg-amber-50",
        detail: `Top spent: ${topCategory.value.name} · ${money(topCategory.value.amount)}`,
    },
]);
</script>

<template>
    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
            v-for="card in cards"
            :key="card.name"
            class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-slate-500">
                    {{ card.name }}
                </p>
                <span
                    class="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                    :class="[card.bg, card.color]"
                >
                    {{ card.icon }}
                </span>
            </div>

            <p
                class="mt-3 break-all text-2xl font-bold tracking-tight text-slate-800"
            >
                {{ card.amount }}
            </p>
            <p
                class="mt-2 truncate text-xs text-slate-400"
                :title="card.detail"
            >
                {{ card.detail }}
            </p>
        </article>
    </section>
</template>
