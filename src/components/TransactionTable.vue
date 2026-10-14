<script setup lang="ts">
import { transactions, removeTransaction } from "@/data/transactions";
import { computed } from "vue";

const selectedTransactions = computed(() =>
    transactions.value.filter((transaction) => transaction.isSelected),
);

const deleteTransactions = () => {
    selectedTransactions.value.forEach((transaction) => {
        removeTransaction(transaction.id);
    });
};
</script>

<template>
    <div
        v-if="selectedTransactions.length > 0"
        class="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4"
    >
        <p class="text-sm font-medium text-gray-700">
            {{ selectedTransactions.length }}
            {{
                selectedTransactions.length === 1
                    ? "transaction"
                    : "transactions"
            }}
            selected
        </p>

        <div class="flex gap-2">
            <button
                type="button"
                @click="deleteTransactions"
                class="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
                <span class="mr-1">🗑</span>
                Delete selected
            </button>
        </div>
    </div>
    <div class="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                    <th class="w-10 px-2 py-4"></th>
                    <th class="px-6 py-4 font-bold">Date</th>
                    <th class="px-6 py-4 font-bold">Category</th>
                    <th class="px-6 py-4 font-bold">Type</th>
                    <th class="px-6 py-4 text-right font-bold">Amount</th>
                    <th class="px-6 py-4 font-bold">Note</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <tr
                    v-for="(transaction, index) in transactions"
                    :key="`${transaction.date}-${index}`"
                    class="hover:bg-gray-50"
                >
                    <td class="w-10 px-2 pt-1 text-center">
                        <input
                            type="checkbox"
                            v-model="transaction.isSelected"
                            class="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
                        />
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                        {{ transaction.date }}
                    </td>

                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {{ transaction.category }}
                    </td>

                    <td class="px-6 py-4">
                        <span
                            :class="
                                transaction.type === 'Income'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-red-100 text-red-700'
                            "
                            class="rounded-lg px-2.5 py-1 text-xs font-medium"
                        >
                            {{ transaction.type }}
                        </span>
                    </td>

                    <td
                        class="whitespace-nowrap px-6 py-4 text-right font-semibold"
                        :class="
                            transaction.type === 'Income'
                                ? 'text-emerald-600'
                                : 'text-red-600'
                        "
                    >
                        {{ transaction.type === "Income" ? "+" : "-" }}
                        {{ (transaction.amount ?? 0).toFixed(2) }}
                    </td>

                    <td class="px-6 py-4 text-gray-500">
                        {{ transaction.note || "—" }}
                    </td>
                    <!-- <td class="px-6 py-4 text-center">
                        <button
                            type="button"
                            @click="removeTransaction(transaction.id)"
                            class="rounded-md px-3 py-1.5 font-medium text-red-600 hover:bg-red-50 hover:text-red-800"
                        >
                            Delete
                        </button>
                    </td> -->
                </tr>

                <tr v-if="transactions.length === 0">
                    <td
                        colspan="5"
                        class="px-6 py-10 text-center text-gray-500"
                    >
                        No transactions yet.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
