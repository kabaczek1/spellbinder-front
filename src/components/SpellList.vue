<script setup lang="ts">
import { ref } from "vue";

import Spell from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import SpellFormVue from "./SpellForm.vue";
import SpellFilterVue from "./SpellFilter.vue";

import { spells, classes, casting_times, schools } from "../main";

const showAddForm = ref(false);
const showFilterForm = ref(false);

const deletespell = () => {
    spells.pop();
};
</script>

<template>
    <div class="flex flex-col justify-items-center">
        <button @click="deletespell">deletespell</button>
        <button @click="showAddForm = !showAddForm">
            toggle add spell form
        </button>
        <button @click="showFilterForm = !showFilterForm">
            toggle add spell filter
        </button>
        <SpellFilterVue v-if="showFilterForm" />
        <SpellFormVue v-if="showAddForm" />
        <SpellVue v-for="spell in spells" :key="spell.spellId" :spell="spell" />
    </div>
</template>

<style scoped></style>
