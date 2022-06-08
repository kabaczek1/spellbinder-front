<script setup lang="ts">
import { ref } from "vue";

import { Spell } from "../interfaces/Spell";

import SpellVue from "./Spell.vue";
import SpellFormVue from "./SpellForm.vue";
import SpellFilterVue from "./SpellFilter.vue";

import { spells, classes, casting_times, schools, showAddForm } from "../setup";
import ImportExport from "./ImportExport.vue";

const showFilterForm = ref(false);
const showImportExport = ref(false);
</script>

<template>
    <!-- {{ spells }} -->
    <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg m-4 ml-8 w-48"
        @click="showAddForm = !showAddForm"
    >
        {{ showAddForm ? "Hide" : "Show" }} spell form
    </button>
    <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg m-4 w-48"
        @click="showFilterForm = !showFilterForm"
    >
        {{ showFilterForm ? "Hide" : "Show" }} spell filter
    </button>
    <!-- <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg m-4 w-48"
        @click="showImportExport = !showImportExport"
    >
        {{ showImportExport ? "Hide" : "Show" }} Import/Export
    </button> -->
    <div class="flex flex-col justify-items-center">
        <SpellFilterVue v-show="showFilterForm" />
        <SpellFormVue v-show="showAddForm" />
        <ImportExport v-show="showImportExport" />
        <SpellVue v-for="spell in spells" :key="spell.id" :spell="spell" />
    </div>
</template>

<style scoped></style>
