<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { TransactionFilters } from "../types/transaction";
import { useTransactions } from "../composables/useTransactions";
import type { Transaction } from "../types/transaction";
import Pagination from "./Pagination.vue";
import ConfirmBox from "./ConfirmBox.vue";

const { selectedId, removeTransaction, filterTransactions } = useTransactions();

const currentPage = ref(1);
const pageSize = ref(10);

const props = defineProps<{
    filter: TransactionFilters;
}>();

defineEmits<{
    edit: [Transaction];
}>();

const selectAll = ref<boolean>(false);
const filteredTransactions = computed(() => filterTransactions(props.filter));

const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;

    return filteredTransactions.value.slice(start, start + pageSize.value);
});

watch(
    () => props.filter,
    () => {
        currentPage.value = 1;
    },
    { deep: true },
);

watch([() => filteredTransactions.value.length, pageSize], () => {
    const lastPage = Math.max(
        1,
        Math.ceil(filteredTransactions.value.length / pageSize.value),
    );

    if (currentPage.value > lastPage) {
        currentPage.value = lastPage;
    }
});

const showConfirm = ref<boolean>(false);
const transactionIdToDelete = ref<number[]>([]);

const askDelete = (id: number[]) => {
    transactionIdToDelete.value.push(...id);
    showConfirm.value = true;
};

const cancelDelete = () => {
    showConfirm.value = false;
    transactionIdToDelete.value = [];
};

const confirmDelete = () => {
    transactionIdToDelete.value.forEach((id) => {
        removeTransaction(id);
    });
    cancelDelete();
    selectedId.value = [];
    selectAll.value = false;
};

watch(selectAll, (newValue) => {
    if (newValue) {
        filteredTransactions.value.forEach((t) => {
            selectedId.value.push(t.id);
        });
    } else {
        selectedId.value = [];
    }
});
</script>

<template>
    <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Transactions</h2>
        <div
            v-if="selectedId.length > 0"
            class="flex items-center justify-end gap-3 rounded-xl"
        >
            <p class="text-xs font-medium text-gray-700">
                {{ selectedId.length }}
                {{ selectedId.length === 1 ? "transaction" : "transactions" }}
                selected
            </p>

            <div class="flex gap-2">
                <button
                    type="button"
                    @click="askDelete(selectedId)"
                    class="rounded-lg border border-red-200 bg-white px-2 py-1 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                    <span class="mr-1 font-medium text-xs"
                        >🗑Delete selected</span
                    >
                </button>
            </div>
        </div>
    </div>

    <div class="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table class="w-full text-left text-xs">
            <thead class="bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                    <th class="w-10 px-2 py-4 justify-center items-center flex">
                        <input
                            type="checkbox"
                            v-model="selectAll"
                            class="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
                        />
                    </th>
                    <th class="px-6 py-4 font-bold">Date</th>
                    <th class="px-6 py-4 font-bold">Category</th>
                    <th class="px-6 py-4 font-bold">Type</th>
                    <th class="px-6 py-4 text-right font-bold">Amount</th>
                    <th class="px-6 py-4 font-bold">Note</th>
                    <th class="px-6 py-4 text-center font-bold">Action</th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <tr
                    v-for="(transaction, index) in paginatedTransactions"
                    :key="`${transaction.date}-${index}`"
                    class="hover:bg-gray-50"
                >
                    <td class="w-10 px-2 pt-1 text-center">
                        <input
                            type="checkbox"
                            v-model="selectedId"
                            :value="transaction.id"
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
                        {{ transaction.type === "Income" ? "+$" : "-$" }}
                        {{ (transaction.amount ?? 0).toFixed(2) }}
                    </td>

                    <td class="px-6 py-4 text-gray-500">
                        {{ transaction.note || "—" }}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center justify-center gap-2">
                            <!-- Edit -->
                            <button
                                type="button"
                                @click="$emit('edit', transaction)"
                                title="Edit transaction"
                                aria-label="Edit transaction"
                                class="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M12 20h9" />
                                    <path
                                        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z"
                                    />
                                </svg>
                            </button>

                            <!-- Delete -->
                            <button
                                type="button"
                                @click="askDelete([transaction.id])"
                                title="Delete transaction"
                                aria-label="Delete transaction"
                                class="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="m19 6-1 14H6L5 6" />
                                    <path d="M10 11v5" />
                                    <path d="M14 11v5" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>

                <tr v-if="filteredTransactions.length === 0">
                    <td
                        colspan="7"
                        class="px-6 py-10 text-center text-gray-500"
                    >
                        No transactions yet.
                    </td>
                </tr>
            </tbody>
        </table>

        <ConfirmBox
            :show="showConfirm"
            title="Delete Transaction?"
            message="Are you sure you want to continue? This action cannot be undone."
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        ></ConfirmBox>
        <Pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total-items="filteredTransactions.length"
        />
    </div>
</template>
