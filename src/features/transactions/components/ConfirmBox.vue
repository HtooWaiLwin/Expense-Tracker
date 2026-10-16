<script setup lang="ts">
defineProps<{
    show: boolean;
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
                class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
                <div class="flex items-center">
                    <div
                        class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-xl text-rose-600"
                    >
                        !
                    </div>

                    <h2 class="text-lg font-semibold text-slate-800 pb-3 pl-3">
                        {{ title || "Delete transaction?" }}
                    </h2>
                </div>

                <p class="mt-2 text-sm leading-6 text-slate-500">
                    {{
                        message ||
                        "This transaction will be permanently deleted. This action cannot be undone."
                    }}
                </p>

                <div class="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        @click="emit('cancel')"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                        @click="emit('confirm')"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
