<script setup lang="ts">
import { reactive } from "vue";
import { Spell } from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import { spells, classes, casting_times, schools } from "../setup";
import spelllvlarray from "../data/spelllvlarray.json";

const filteringSpell = reactive({
    name: "",
    allowSpellLevelFiltering: false,
    spellLevel: 0,
    spellSchool: 0,
    castingTime: 0,
    verbal: false,
    somatic: false,
    material: false,
    class: [],
});

const findspells = () => {
    spells.forEach((spell) => {
        spell.show = true;
        //console.log(spell.name);
        if (filteringSpell.name != "") {
            if (!spell.name.match(filteringSpell.name)) spell.show = false; // tolowercase?
        }
        if (filteringSpell.allowSpellLevelFiltering == true) {
            if (filteringSpell.spellLevel != spell.spellLevel)
                spell.show = false;
        }
        if (filteringSpell.spellSchool != 0) {
            if (filteringSpell.spellSchool != spell.spellSchool)
                spell.show = false;
        }
        if (filteringSpell.castingTime != 0) {
            if (filteringSpell.castingTime != spell.castingTime)
                spell.show = false;
        }
        if (filteringSpell.verbal) {
            if (!spell.verbal) spell.show = false;
        }
        if (filteringSpell.somatic) {
            if (!spell.somatic) spell.show = false;
        }
        if (filteringSpell.material) {
            if (!spell.material) spell.show = false;
        }
        filteringSpell.class.forEach((id) => {
            if (spell.class.indexOf(id) == -1) spell.show = false;
        });
    });
};
const showallspells = () => {
    spells.forEach((spell) => {
        spell.show = true;
    });
};
</script>

<template>
    <div
        class="lg:w-8/12 sm:w-11/12 bg-green-300 p-6 rounded-lg text-left my-2 m-auto"
    >
        <p class="text-2xl">
            <input
                v-model="filteringSpell.name"
                type="text"
                placeholder="name"
                class="py-2 px-4"
            />
        </p>
        <p>
            <label
                ><input
                    type="checkbox"
                    v-model="filteringSpell.allowSpellLevelFiltering"
                />filter by spell level</label
            >
            <select
                v-model="filteringSpell.spellLevel"
                v-show="filteringSpell.allowSpellLevelFiltering"
            >
                <option v-for="(lvl, index) in spelllvlarray" :value="index">
                    {{ lvl }}
                </option>
            </select>
        </p>
        <p>
            <select v-model="filteringSpell.spellSchool">
                <option v-for="(school, index) in schools" :value="index">
                    {{ school }}
                </option>
            </select>
        </p>
        <p>
            <span class="font-bold">Casting Time: </span>
            <select v-model="filteringSpell.castingTime">
                <option v-for="(time, index) in casting_times" :value="index">
                    {{ time }}
                </option>
            </select>
        </p>
        <p>
            <span class="font-bold">Components: </span>
            <label>
                <input type="checkbox" v-model="filteringSpell.verbal" />
                Verbal
            </label>
            <label>
                <input type="checkbox" v-model="filteringSpell.somatic" />
                Somatic
            </label>
            <label>
                <input type="checkbox" v-model="filteringSpell.material" />
                Material
            </label>
        </p>
        <p>
            <span class="font-bold">Classes: </span>
            <label v-for="(pcclass, index) in classes">
                <input
                    type="checkbox"
                    :value="index"
                    v-model="filteringSpell.class"
                    class="py-2 px-4"
                    v-if="index != 0"
                />
                <span v-if="index != 0">{{ pcclass }}</span>
            </label>
        </p>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
            @click="findspells"
        >
            Find spells
        </button>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
            @click="showallspells"
        >
            Show all spells
        </button>
    </div>
</template>

<style scoped></style>
