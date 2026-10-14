<script setup lang="ts">
import {
    type Transaction,
    IncomeCategories,
    ExpenseCategories,
} from "@/interfaces/transaction";
import { ref, watch } from "vue";

const props = defineProps<{
    showTransactionForm: boolean;
    transaction: Transaction;
}>();

const localTransaction = ref<Transaction>({ ...props.transaction });

watch(
    () => localTransaction.value.type,
    (newData) => {
        localTransaction.value.category = "";
    },
);

const emit = defineEmits<{
    close: [];
    add: [Transaction];
}>();

const close = () => {
    localTransaction.value = { ...props.transaction };
    emit("close");
};

const submit = () => {
    emit("add", { ...localTransaction.value });
    close();
};
</script>

<template>
    <div
        v-if="showTransactionForm"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4 backdrop-blur-sm"
        @click.self="close"
    >
        <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-form-title"
            @submit.prevent="submit"
            class="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
            <!-- Header -->
            <div
                class="flex items-start justify-between border-b border-gray-100 px-6 py-5 sm:px-8"
            >
                <div>
                    <h2
                        id="transaction-form-title"
                        class="text-xl font-bold tracking-tight text-gray-900"
                    >
                        Add Transaction
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                        Enter the details of your financial activity.
                    </p>
                </div>

                <button
                    type="button"
                    @click="close"
                    aria-label="Close form"
                    class="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            d="M6 6l12 12M18 6L6 18"
                        />
                    </svg>
                </button>
            </div>

            <!-- Form Fields -->
            <div class="space-y-5 px-6 py-6 sm:px-8">
                <!-- Type -->
                <fieldset>
                    <legend
                        class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Transaction Type
                    </legend>

                    <div class="grid grid-cols-2 gap-3">
                        <label
                            :class="
                                localTransaction.type === 'Income'
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-gray-50'
                            "
                            class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition"
                        >
                            <input
                                v-model="localTransaction.type"
                                type="radio"
                                value="Income"
                                class="sr-only"
                            />
                            <span
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                            >
                                +
                            </span>
                            Income
                        </label>

                        <label
                            :class="
                                localTransaction.type === 'Expense'
                                    ? 'border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-gray-50'
                            "
                            class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition"
                        >
                            <input
                                v-model="localTransaction.type"
                                type="radio"
                                value="Expense"
                                class="sr-only"
                            />
                            <span
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-700"
                            >
                                −
                            </span>
                            Expense
                        </label>
                    </div>
                </fieldset>

                <!-- Amount and Date -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            for="transaction-amount"
                            class="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Amount
                        </label>

                        <div class="relative">
                            <span
                                class="absolute inset-y-0 left-3 flex items-center text-sm text-gray-400"
                            >
                                $
                            </span>
                            <input
                                id="transaction-amount"
                                v-model.number="localTransaction.amount"
                                type="number"
                                min="0.01"
                                step="any"
                                placeholder="0.00"
                                required
                                class="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-8 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="transaction-date"
                            class="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Date
                        </label>

                        <input
                            id="transaction-date"
                            v-model="localTransaction.date"
                            type="date"
                            required
                            class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                </div>

                <!-- Category -->
                <div>
                    <label
                        for="transaction-category"
                        class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Category
                    </label>

                    <select
                        id="transaction-category"
                        v-model="localTransaction.category"
                        required
                        class="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    >
                        <option value="" disabled selected>
                            Select a category
                        </option>

                        <option
                            v-if="localTransaction.type === 'Income'"
                            v-for="category in IncomeCategories"
                            :key="category + '-income'"
                            :value="category"
                        >
                            {{ category }}
                        </option>
                        <option
                            v-else
                            v-for="category in ExpenseCategories"
                            :key="category + '-expense'"
                            :value="category"
                        >
                            {{ category }}
                        </option>
                    </select>
                </div>

                <!-- Note -->
                <div>
                    <label
                        for="transaction-note"
                        class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Note
                        <span class="font-normal text-gray-400"
                            >(Optional)</span
                        >
                    </label>

                    <input
                        id="transaction-note"
                        v-model="localTransaction.note"
                        type="text"
                        placeholder="e.g. Grocery shopping"
                        class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>
            </div>

            <!-- Footer -->
            <div
                class="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end sm:px-8"
            >
                <button
                    type="button"
                    @click="close"
                    class="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    class="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add Transaction
                </button>
            </div>
        </form>
    </div>
</template>
