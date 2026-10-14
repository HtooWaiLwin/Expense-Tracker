<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);

const closeMenu = () => {
    isOpen.value = false;
};
</script>

<template>
    <!-- Mobile button -->
    <button
        type="button"
        @click="isOpen = true"
        aria-label="Open navigation menu"
        class="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 md:hidden"
    >
        <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    </button>

    <!-- Mobile backdrop -->
    <Transition name="fade">
        <div
            v-if="isOpen"
            class="fixed inset-0 z-40 bg-gray-950/50 backdrop-blur-sm md:hidden"
            @click="closeMenu"
        />
    </Transition>

    <!-- Sidebar -->
    <aside
        :class="[
            'fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-10 md:translate-x-0',
            isOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
    >
        <!-- Logo and close button -->
        <div
            class="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 px-5"
        >
            <div class="flex items-center gap-3">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-sm"
                >
                    $
                </div>

                <div>
                    <h1 class="text-lg font-bold tracking-tight text-gray-900">
                        Expense Tracker
                    </h1>
                    <p class="text-xs text-gray-500">Personal Finance</p>
                </div>
            </div>

            <button
                type="button"
                @click="closeMenu"
                aria-label="Close navigation menu"
                class="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 md:hidden"
            >
                <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6l12 12M18 6 6 18"
                    />
                </svg>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-2 overflow-y-auto px-4 py-6">
            <p
                class="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400"
            >
                Menu
            </p>

            <!-- Dashboard -->
            <RouterLink
                to="/"
                exact-active-class="bg-blue-50 text-blue-700 font-semibold"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                @click="closeMenu"
            >
                <svg
                    class="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 10.5 12 3l9 7.5M5.5 9v11h13V9M9 20v-7h6v7"
                    />
                </svg>
                Dashboard
            </RouterLink>

            <!-- Transactions -->
            <RouterLink
                to="/transactions"
                active-class="bg-blue-50 text-blue-700 font-semibold"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                @click="closeMenu"
            >
                <svg
                    class="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"
                    />
                </svg>
                Transactions
            </RouterLink>
        </nav>

        <!-- Footer -->
        <div class="shrink-0 border-t border-gray-100 p-4">
            <div class="rounded-xl bg-gray-50 px-3 py-4 text-center">
                <p class="text-sm font-medium text-gray-700">
                    Manage your money
                </p>
                <p class="mt-1 text-xs text-gray-400">
                    One transaction at a time.
                </p>
            </div>
        </div>
    </aside>
</template>

<!-- <style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style> -->
