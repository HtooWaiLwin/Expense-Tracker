<script setup lang="ts">
import { RouterView } from "vue-router";
import SideBar from "./components/SideBar.vue";
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <div class="flex min-h-screen">
            <SideBar />

            <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                <div class="mx-auto w-full max-w-7xl">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>
