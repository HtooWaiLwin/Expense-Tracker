<script setup lang="ts">
import AddTransaction from "@/features/transactions/components/AddTransaction.vue";
import TransactionTable from "@/features/transactions/components/TransactionTable.vue";
import TransactionFilter from "@/features/transactions/components/TransactionFilter.vue";
import type { Transaction } from "@/features/transactions/types/transaction";
import { ref } from "vue";
import { useTransactions } from "@/features/transactions/composables/useTransactions";
import type { TransactionFilters } from "@/features/transactions/types/transaction";

const showTransactionForm = ref<boolean>(false);
const edit = ref<boolean>(true);

const defaultTransaction = ref<Transaction>({
    id: 0,
    type: "Income",
    amount: undefined,
    category: "",
    date: new Date().toISOString().slice(0, 10),
});

const editTransaction = ref<Transaction>({
    id: 0,
    type: "Income",
    amount: undefined,
    category: "",
    date: "",
});

const filterObj = ref<TransactionFilters>({
    type: "All",
    dateRange: "all",
    startDate: "",
    endDate: "",
    search: "",
});
const handleEvent = (filter: TransactionFilters) => (filterObj.value = filter);

const { addTransaction, updateTransaction } = useTransactions();

const openAddForm = () => {
    edit.value = false;
    editTransaction.value = { ...defaultTransaction.value };
    showTransactionForm.value = true;
};

const editForm = (transaction: Transaction) => {
    editTransaction.value = { ...transaction };
    edit.value = true;
    showTransactionForm.value = true;
};

const closeForm = () => {
    showTransactionForm.value = false;
};

const handleSaveTransaction = (transaction: Transaction) => {
    if (edit.value) {
        updateTransaction(transaction);
    } else {
        addTransaction(transaction);
    }

    closeForm();
};
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
                        Transactions
                    </h1>
                    <p class="mt-2 text-sm text-gray-500">
                        Track and manage your income and expenses.
                    </p>
                </div>

                <button
                    type="button"
                    @click="openAddForm"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <span class="text-lg leading-none">+</span>
                    Add Transaction
                </button>
            </header>

            <TransactionFilter @filter-change="handleEvent"></TransactionFilter>

            <!-- Transaction List -->
            <section
                class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm mt-6"
            >
                <div class="p-4 sm:p-6">
                    <TransactionTable :filter="filterObj" @edit="editForm" />
                </div>
            </section>

            <!-- Add Transaction Modal -->
            <AddTransaction
                :show-transaction-form="showTransactionForm"
                :transaction="edit ? editTransaction : defaultTransaction"
                :edit="edit"
                @close="closeForm"
                @add="handleSaveTransaction"
            />
        </div>
    </main>
</template>
