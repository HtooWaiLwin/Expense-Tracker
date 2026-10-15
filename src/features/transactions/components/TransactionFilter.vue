<script setup lang="ts">
import { reactive, watch } from "vue";
import type { TransactionFilters } from "../types/transaction";

const emit = defineEmits<{
    "filter-change": [filters: TransactionFilters];
}>();

const filters = reactive<TransactionFilters>({
    type: "All",
    dateRange: "all",
    startDate: "",
    endDate: "",
    search: "",
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
    filters.search = "";
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

        <!-- Search bar -->
        <div class="mb-4">
            <label
                for="transaction-search"
                class="mb-1.5 block text-sm font-medium text-gray-700"
            >
                Search transactions
            </label>

            <div class="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>

                <input
                    id="transaction-search"
                    v-model="filters.search"
                    type="search"
                    placeholder="Search category, note, amount..."
                    class="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>
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
