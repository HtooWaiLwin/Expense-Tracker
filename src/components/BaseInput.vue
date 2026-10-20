<script setup lang="ts">
interface Props {
    modelValue: string | number;
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    prefix?: string;
    labelClass?: string;
    inputClass?: string;
}

withDefaults(defineProps<Props>(), {
    type: "text",
    placeholder: "",
    error: "",
    required: false,
    disabled: false,
    prefix: "",
    labelClass: "mb-2 block text-sm font-semibold text-gray-700",
    inputClass:
        "w-full rounded-xl border bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
});

const model = defineModel<string | number>({
    required: true,
});
</script>

<template>
    <div>
        <label :for="id" :class="labelClass">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div :class="prefix ? 'relative' : ''">
            <span
                v-if="prefix"
                class="absolute inset-y-0 left-3 flex items-center text-sm text-gray-400"
            >
                {{ prefix }}
            </span>

            <input
                :id="id"
                v-model="model"
                :type="type"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                :min="min"
                :max="max"
                :step="step"
                :aria-invalid="!!error"
                :aria-describedby="error ? `${id}-error` : undefined"
                :class="[
                    inputClass,
                    prefix ? 'pl-8' : '',
                    error ? 'border-red-500' : 'border-gray-200',
                    disabled ? 'cursor-not-allowed opacity-60' : '',
                ]"
            />
        </div>

        <p
            v-if="error"
            :id="`${id}-error`"
            class="mt-1 text-sm text-red-600"
            role="alert"
        >
            {{ error }}
        </p>
    </div>
</template>
