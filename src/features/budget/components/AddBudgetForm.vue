<script setup lang="ts">
import BaseSelect from "@/components/BaseSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
import { budgetSchema } from "../schemas/budgetSchema";
import { useForm } from "vee-validate";
import type { BudgetForm, Budget } from "../types/budget";
import { watch, ref, computed } from "vue";
import { ExpenseCategories } from "@/features/transactions/types/transaction";

const submitted = ref<boolean>(false);

const props = defineProps<{
    showBudgetForm: boolean;
    budget: Budget;
    edit: boolean;
    budgets: Budget[];
}>();

watch(
    () => props.budget,
    () => {
        resetForm({ values: getInitialValues() });
    },
);

const emit = defineEmits<{
    close: [];
    add: [budget: Budget];
}>();

const getInitialValues = () => ({
    amount: props.budget.amount,
    category: props.budget.category,
});

const { defineField, errors, handleSubmit, resetForm, setFieldValue } =
    useForm<BudgetForm>({
        validationSchema: budgetSchema,
        initialValues: getInitialValues(),
    });

const [amount] = defineField("amount");
const [category] = defineField("category");
const close = () => {
    resetForm({ values: getInitialValues() });
    emit("close");
};

const submit = () => {
    submitted.value = true;
    handleSubmit((values) => {
        const budget: Budget = {
            ...props.budget,
            ...values,
            amount: Number(values.amount),
        };

        emit("add", budget);
        close();
    })();
};

const categoryOptions = computed(() => {
    const usedCategories = new Set(
        props.budgets
            .filter((item) => item.id !== props.budget.id)
            .map((item) => item.category),
    );

    return ExpenseCategories.filter((item) => !usedCategories.has(item)).map(
        (item) => ({
            label: item,
            value: item,
        }),
    );
});
</script>

<template>
    <div
        v-if="showBudgetForm"
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
                        Add Budget
                    </h2>
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
                        {{ edit ? "Save" : "Add Budget" }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
