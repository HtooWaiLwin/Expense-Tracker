<script setup lang="ts">
interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

interface Props {
    label: string;
    id: string;
    options?: SelectOption[];
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    labelClass?: string;
    selectClass?: string;
}

withDefaults(defineProps<Props>(), {
    options: () => [],
    placeholder: "Select an option",
    error: "",
    required: false,
    disabled: false,
    labelClass: "mb-1.5 block text-sm font-medium text-gray-700",
    selectClass:
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
});

const modelValue = defineModel();
</script>

<template>
    <div>
        <label :for="id" :class="labelClass">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <select
            :id="id"
            v-model="modelValue"
            :required="required"
            :disabled="disabled"
            :class="[
                selectClass,
                error ? 'border-red-500' : '',
                disabled ? 'cursor-not-allowed opacity-60' : '',
            ]"
        >
            <option v-if="placeholder" value="" disabled>
                {{ placeholder }}
            </option>

            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>

        <p
            v-if="error"
            :id="`${id}-error`"
            class="mt-1 text-sm text-red-500"
            role="alert"
        >
            {{ error }}
        </p>
    </div>
</template>
