```vue
<script setup lang="ts">
import { computed } from "vue";
import { money } from "../composables/useDashBoardStats";

const props = defineProps<{
    balance: number;
    income: number;
    expense: number;
}>();

const cards = computed(() => [
    {
        name: "Total Balance",
        amount: props.balance,
        icon: "◈",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        name: "Total Income",
        amount: props.income,
        icon: "↗",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        name: "Total Expenses",
        amount: props.expense,
        icon: "↘",
        color: "text-rose-600",
        bg: "bg-rose-50",
    },
]);
</script>

<template>
    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                {{ money(card.amount) }}
            </p>
            <p class="mt-2 text-xs text-slate-400">All transactions</p>
        </article>
    </section>
</template>
