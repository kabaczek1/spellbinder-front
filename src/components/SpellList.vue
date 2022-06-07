<script setup lang="ts">
import { reactive } from "vue";

import Spell from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import SpellFormVue from "./SpellForm.vue";

import { spells, classes, casting_times, schools } from "../main";

const deletespell = () => {
    spells.pop();
};
</script>

<template>
    <div class="flex flex-col justify-items-center">
        <button @click="deletespell">deletespell</button>
        <SpellFormVue />
        <SpellVue v-for="spell in spells" :key="spell.spellId" :spell="spell" />
    </div>
</template>

<style scoped></style>
