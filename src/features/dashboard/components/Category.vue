<script setup lang="ts">
import { computed } from "vue";
import { money } from "../composables/useDashBoardStats";

const props = defineProps<{
    type: "Income" | "Expense";
    items: { name: string; amount: number; percent: number }[];
}>();

const title = computed(() =>
    props.type === "Income" ? "Income by Category" : "Expenses by Category",
);

const color = computed(() =>
    props.type === "Income" ? "bg-emerald-400" : "bg-rose-400",
);

const iconStyle = computed(() =>
    props.type === "Income"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-rose-50 text-rose-500",
);
</script>

<template>
    <article
        class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
        <div class="mb-5 flex items-center gap-3">
            <span
                class="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                :class="iconStyle"
            >
                ◔
            </span>
            <h2 class="font-semibold text-slate-800">{{ title }}</h2>
        </div>

        <p v-if="!items.length" class="py-8 text-center text-sm text-slate-400">
            No data available yet
        </p>

        <div v-for="item in items" :key="item.name" class="mb-4 last:mb-0">
            <div class="mb-2 flex items-center justify-between gap-3 text-sm">
                <span class="truncate font-medium text-slate-600">
                    {{ item.name }}
                </span>
                <span class="shrink-0 font-semibold text-slate-800">
                    {{ money(item.amount) }}
                    <span class="ml-1 text-xs font-normal text-slate-400">
                        {{ Math.round(item.percent) }}%
                    </span>
                </span>
            </div>

            <div class="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    class="h-full rounded-full transition-all"
                    :class="color"
                    :style="{ width: `${item.percent}%` }"
                />
            </div>
        </div>
    </article>
</template>
