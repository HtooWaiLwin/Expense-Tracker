<script setup lang="ts">
import type { Transaction } from "@/features/transactions/types/transaction";
import { money } from "@/utils/formatMoney";

defineProps<{ transactions: Transaction[] }>();
</script>

<template>
    <section
        class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
    >
        <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
        >
            <div>
                <h2 class="font-semibold text-slate-800">
                    Recent Transactions
                </h2>
                <p class="mt-1 text-xs text-slate-400">Your latest activity</p>
            </div>
            <span
                class="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500"
            >
                {{ transactions.length }} transactions
            </span>
        </div>

        <div v-if="transactions.length" class="divide-y divide-slate-100">
            <div
                v-for="t in transactions"
                :key="t.id"
                class="flex items-center justify-between gap-3 px-5 py-4 transition hover:bg-slate-50/70"
            >
                <div class="flex min-w-0 items-center gap-3">
                    <span
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                        :class="
                            t.type === 'Income'
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-rose-50 text-rose-500'
                        "
                    >
                        {{ t.type === "Income" ? "↗" : "↘" }}
                    </span>

                    <div class="min-w-0">
                        <p class="truncate text-sm font-medium text-slate-800">
                            {{ t.note || t.category || "Transaction" }}
                        </p>
                        <p class="mt-1 truncate text-xs text-slate-400">
                            {{ t.category }} · {{ t.date }}
                        </p>
                    </div>
                </div>

                <span
                    class="shrink-0 text-sm font-semibold"
                    :class="
                        t.type === 'Income'
                            ? 'text-emerald-600'
                            : 'text-rose-500'
                    "
                >
                    {{ t.type === "Income" ? "+" : "−"
                    }}{{ money(Number(t.amount) || 0) }}
                </span>
            </div>
        </div>

        <div v-else class="px-5 py-10 text-center">
            <p class="text-sm font-medium text-slate-600">
                No transactions yet
            </p>
            <p class="mt-1 text-xs text-slate-400">
                Your latest activity will appear here.
            </p>
        </div>
    </section>
</template>
