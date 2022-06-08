<script setup lang="ts">
import { ref } from "vue";

import { Spell } from "../interfaces/Spell";

import SpellVue from "./Spell.vue";
import SpellFormVue from "./SpellForm.vue";
import SpellFilterVue from "./SpellFilter.vue";

import { spells, classes, casting_times, schools, showAddForm } from "../setup";

const showFilterForm = ref(false);
</script>

<template>
    {{ spells }}
    <div class="flex flex-col justify-items-center">
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4 w-32 absolute bottom-0 left-0"
            @click="showAddForm = !showAddForm"
        >
            Spell form
        </button>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4 w-32 absolute bottom-0 left-36"
            @click="showFilterForm = !showFilterForm"
        >
            Spell filter
        </button>
        <SpellFilterVue v-if="showFilterForm" />
        <SpellFormVue v-if="showAddForm" />
        <SpellVue v-for="spell in spells" :key="spell.id" :spell="spell" />
    </div>
</template>

<style scoped></style>
