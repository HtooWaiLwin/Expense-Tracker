<script setup lang="ts">
import AddTransaction from "@/components/AddTransaction.vue";
import TransactionTable from "@/components/TransactionTable.vue";
import type { Transaction } from "@/interfaces/transaction";
import { ref } from "vue";
import { addTransaction } from "@/data/transactions";
import TransactionFilter from "@/components/TransactionFilter.vue";

const showTransactionForm = ref<boolean>(false);

const transaction = ref<Transaction>({
    id: 0,
    type: "Income",
    amount: undefined,
    category: "",
    date: new Date().toISOString().slice(0, 10),
});
</script>

<template>
    <main class="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <header
                class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                        Transactions
                    </h1>
                    <p class="mt-2 text-sm text-gray-500">
                        Track and manage your income and expenses.
                    </p>
                </div>

                <button
                    type="button"
                    @click="showTransactionForm = true"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span class="text-lg leading-none">+</span>
                    Add Transaction
                </button>
            </header>

            <TransactionFilter></TransactionFilter>

            <!-- Transaction List -->
            <section
                class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm mt-6"
            >
                <div class="border-b border-gray-100 px-5 py-4 sm:px-6">
                    <h2 class="text-lg font-semibold text-gray-900">
                        All Transactions
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                        Your recent financial activity
                    </p>
                </div>

                <div class="p-4 sm:p-6">
                    <TransactionTable />
                </div>
            </section>

            <!-- Add Transaction Modal -->
            <AddTransaction
                :show-transaction-form="showTransactionForm"
                :transaction="transaction"
                @close="showTransactionForm = false"
                @add="addTransaction"
            />
        </div>
    </main>
</template>
