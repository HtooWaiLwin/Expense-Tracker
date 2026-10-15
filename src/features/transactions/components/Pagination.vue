<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        currentPage: number;
        totalItems: number;
        pageSize: number;
        pageSizeOptions?: number[];
    }>(),
    {
        pageSizeOptions: () => [5, 10, 20, 50],
    },
);

const emit = defineEmits<{
    "update:currentPage": [page: number];
    "update:pageSize": [size: number];
}>();

const totalPages = computed(() =>
    Math.max(1, Math.ceil(props.totalItems / props.pageSize)),
);

const startItem = computed(() =>
    props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1,
);

const endItem = computed(() =>
    Math.min(props.currentPage * props.pageSize, props.totalItems),
);

const pages = computed(() =>
    Array.from({ length: totalPages.value }, (_, index) => index + 1),
);

function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        emit("update:currentPage", page);
    }
}

function changePageSize(event: Event) {
    const size = Number((event.target as HTMLSelectElement).value);
    emit("update:pageSize", size);
    emit("update:currentPage", 1);
}
</script>

<template>
    <div
        class="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span>
                Showing
                <span class="font-medium text-gray-900">{{ startItem }}</span>
                to
                <span class="font-medium text-gray-900">{{ endItem }}</span>
                of
                <span class="font-medium text-gray-900">{{ totalItems }}</span>
                results
            </span>

            <label class="flex items-center gap-2">
                <span>Rows:</span>
                <select
                    :value="pageSize"
                    @change="changePageSize"
                    class="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option
                        v-for="size in pageSizeOptions"
                        :key="size"
                        :value="size"
                    >
                        {{ size }}
                    </option>
                </select>
            </label>
        </div>

        <nav
            aria-label="Table pagination"
            class="flex flex-wrap items-center gap-1"
        >
            <button
                type="button"
                :disabled="currentPage <= 1"
                @click="goToPage(currentPage - 1)"
                class="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            <button
                v-for="page in pages"
                :key="page"
                type="button"
                :aria-label="`Go to page ${page}`"
                :aria-current="currentPage === page ? 'page' : undefined"
                @click="goToPage(page)"
                :class="[
                    'min-w-9 rounded-md border px-3 py-2 text-sm',
                    currentPage === page
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100',
                ]"
            >
                {{ page }}
            </button>

            <button
                type="button"
                :disabled="currentPage >= totalPages"
                @click="goToPage(currentPage + 1)"
                class="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </nav>
    </div>
</template>
