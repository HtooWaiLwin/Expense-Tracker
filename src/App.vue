<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from "./components/SideBar.vue";
</script>

<template>
    <div class="min-h-screen bg-gray-50 md:flex">
        <SideBar />

        <main
            class="min-w-0 flex-1 px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-10 md:p-0 lg:p-0"
        >
            <div class="mx-auto w-full max-w-7xl">
                <RouterView />
            </div>
        </main>
    </div>
</template>
