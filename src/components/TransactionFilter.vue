<script setup lang="ts">
import { reactive, watch } from "vue";

export type TransactionFilters = {
    type: "All" | "Income" | "Expense";
    dateRange: "all" | "today" | "month" | "custom";
    startDate: string;
    endDate: string;
};

const emit = defineEmits<{
    "filter-change": [filters: TransactionFilters];
}>();

const filters = reactive<TransactionFilters>({
    type: "All",
    dateRange: "all",
    startDate: "",
    endDate: "",
});

watch(
    filters,
    () => {
        emit("filter-change", { ...filters });
    },
    { deep: true },
);

function resetFilters() {
    filters.type = "All";
    filters.dateRange = "all";
    filters.startDate = "";
    filters.endDate = "";
}
</script>

<template>
    <section
        class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
        <div
            class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
            <div>
                <h2 class="text-base font-semibold text-gray-900">
                    Filter transactions
                </h2>
            </div>

            <button
                type="button"
                @click="resetFilters"
                class="self-start rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 sm:self-auto"
            >
                Reset filters
            </button>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <!-- Transaction type -->
            <div>
                <label
                    for="transaction-type"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Transaction type
                </label>

                <select
                    id="transaction-type"
                    v-model="filters.type"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="All">All transactions</option>
                    <option value="Income">Income only</option>
                    <option value="Expense">Expense only</option>
                </select>
            </div>

            <!-- Date range -->
            <div>
                <label
                    for="date-range"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Date range
                </label>

                <select
                    id="date-range"
                    v-model="filters.dateRange"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="all">All dates</option>
                    <option value="today">Today</option>
                    <option value="month">This month</option>
                    <option value="custom">Custom range</option>
                </select>
            </div>

            <!-- Start date -->
            <div v-if="filters.dateRange === 'custom'">
                <label
                    for="start-date"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    From
                </label>

                <input
                    id="start-date"
                    v-model="filters.startDate"
                    type="date"
                    :max="filters.endDate || undefined"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            <!-- End date -->
            <div v-if="filters.dateRange === 'custom'">
                <label
                    for="end-date"
                    class="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    To
                </label>

                <input
                    id="end-date"
                    v-model="filters.endDate"
                    type="date"
                    :min="filters.startDate || undefined"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>
        </div>
    </section>
</template>
