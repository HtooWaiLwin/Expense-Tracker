<script setup lang="ts">
import {
    type Transaction,
    type TransactionForm,
} from "@/features/transactions/types/transaction";
import { ref, watch, computed, nextTick } from "vue";
import { useForm } from "vee-validate";
import { transactionSchema } from "../schemas/transactionSchema";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
import {
    IncomeCategories,
    ExpenseCategories,
} from "@/features/transactions/types/transaction";

const props = defineProps<{
    showTransactionForm: boolean;
    transaction: Transaction;
    edit: boolean;
}>();

const emit = defineEmits<{
    close: [];
    add: [transaction: Transaction];
}>();

const getInitialValues = () => ({
    type: props.transaction.type,
    amount: props.transaction.amount,
    date: props.transaction.date,
    category: props.transaction.category,
    note: props.transaction.note ?? "",
});

watch(
    () => props.transaction,
    () => {
        resetForm({ values: getInitialValues() });
    },
);

const { defineField, errors, handleSubmit, resetForm, setFieldValue } =
    useForm<TransactionForm>({
        validationSchema: transactionSchema,
        initialValues: getInitialValues(),
    });

// Form fields
const [type] = defineField("type");
const [amount] = defineField("amount");
const [date] = defineField("date");
const [category] = defineField("category");
const [note] = defineField("note");

// Categories depend on transaction type
const categories = computed(() =>
    type.value === "Income" ? IncomeCategories : ExpenseCategories,
);

const categoryOptions = computed(() =>
    categories.value.map((item) => ({
        label: item,
        value: item,
    })),
);

const submitted = ref(false);

// Clear category when the transaction type changes

const resetCategory = () => {
    submitted.value = false;
    setFieldValue("category", "");
};

// Close and reset the form
const close = () => {
    resetForm({ values: getInitialValues() });
    emit("close");
};

const submit = () => {
    submitted.value = true;
    handleSubmit((values) => {
        const transaction: Transaction = {
            ...props.transaction,
            ...values,
            amount: Number(values.amount),
        };

        emit("add", transaction);
        close();
    })();
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
            novalidate
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
                <!-- Transaction Type -->
                <fieldset>
                    <legend
                        class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Transaction Type
                    </legend>

                    <div class="grid grid-cols-2 gap-3">
                        <label
                            @click="resetCategory"
                            :class="
                                type === 'Income'
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-gray-50'
                            "
                            class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition"
                        >
                            <input
                                v-model="type"
                                type="radio"
                                value="Income"
                                class="sr-only"
                                :aria-invalid="!!errors.type"
                            />

                            <span
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                            >
                                +
                            </span>

                            Income
                        </label>

                        <label
                            @click="resetCategory"
                            :class="
                                type === 'Expense'
                                    ? 'border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-gray-50'
                            "
                            class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition"
                        >
                            <input
                                v-model="type"
                                type="radio"
                                value="Expense"
                                class="sr-only"
                                :aria-invalid="!!errors.type"
                            />

                            <span
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-700"
                            >
                                −
                            </span>

                            Expense
                        </label>
                    </div>

                    <p v-if="errors.type" class="mt-1 text-sm text-red-600">
                        {{ errors.type }}
                    </p>
                </fieldset>

                <!-- Amount and Date -->
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <!-- Amount -->
                    <BaseInput
                        id="transaction-amount"
                        v-model="amount"
                        label="Amount"
                        type="number"
                        min="0.01"
                        step="any"
                        placeholder="0.00"
                        prefix="$"
                        :error="errors.amount"
                    />

                    <!-- Date -->
                    <BaseInput
                        id="transaction-date"
                        v-model="date"
                        label="Date"
                        type="date"
                        :error="errors.date"
                    />
                </div>

                <!-- Category -->
                <BaseSelect
                    id="transaction-category"
                    v-model="category"
                    label="Category"
                    :options="categoryOptions"
                    placeholder="Select a category"
                    :error="submitted ? errors.category : ''"
                    :required="true"
                ></BaseSelect>

                <!-- Note -->
                <div>
                    <label
                        for="transaction-note"
                        class="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Note
                        <span class="font-normal text-gray-400">
                            (Optional)
                        </span>
                    </label>

                    <input
                        id="transaction-note"
                        v-model="note"
                        type="text"
                        placeholder="e.g. Grocery shopping"
                        :aria-invalid="!!errors.note"
                        class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <p v-if="errors.note" class="mt-1 text-sm text-red-600">
                        {{ errors.note }}
                    </p>
                </div>

                <div
                    class="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 py-4 sm:flex-row sm:justify-end"
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
                        {{ edit ? "Save" : "Add Transaction" }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
