<script setup lang="ts">
defineProps<{
    show: boolean;
    category?: string;
    title?: string;
    message?: string;
}>();

const emit = defineEmits<{
    confirm: [];
    cancel: [];
}>();
</script>

<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
            @click.self="emit('cancel')"
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="budget-confirm-title"
                aria-describedby="budget-confirm-message"
                class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
                <!-- Header -->
                <div class="flex items-center">
                    <div
                        class="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-xl font-bold text-rose-600"
                        aria-hidden="true"
                    >
                        !
                    </div>

                    <h2
                        id="budget-confirm-title"
                        class="pb-3 pl-3 text-lg font-semibold text-slate-800"
                    >
                        {{ title || "Delete budget?" }}
                    </h2>
                </div>

                <!-- Message -->
                <p
                    id="budget-confirm-message"
                    class="mt-2 text-sm leading-6 text-slate-500"
                >
                    {{
                        message ||
                        `Are you sure you want to delete the ${category || "selected"} budget? This action cannot be undone.`
                    }}
                </p>

                <!-- Actions -->
                <div class="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        @click="emit('cancel')"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                        @click="emit('confirm')"
                    >
                        Delete Budget
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
