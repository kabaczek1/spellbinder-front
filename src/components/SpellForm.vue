<script setup lang="ts">
import { reactive, ref } from "vue";
import Spell from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import { spells, classes, casting_times, schools } from "../main";
import spelllvlarray from "../data/spelllvlarray.json";
import config from "../data/config.json";

import axios from "axios";

const showMaterialInput = ref(false);

const blankSpell: Spell = {
    name: "",
    spellLevel: 0,
    spellSchool: 0,
    castingTime: 0,
    range: "",
    verbal: false,
    somatic: false,
    material: "",
    duration: "",
    class: [],
    description: "",
};

let newSpell: Spell = reactive(blankSpell);

const addspell = () => {
    //validation
    const spellToAdd: Spell = {
        name: newSpell.name,
        spellLevel: newSpell.spellLevel,
        spellSchool: newSpell.spellSchool,
        castingTime: newSpell.castingTime,
        range: newSpell.range,
        verbal: newSpell.verbal,
        somatic: newSpell.somatic,
        material: newSpell.material,
        duration: newSpell.duration,
        class: newSpell.class,
        description: newSpell.description,
    };
    spells.push();
    axios.post(`${config.backend}/spells`, spellToAdd).then(
        (response) => {
            console.log(response.data.id);
            spellToAdd.spellId = response.data.id;
            spells.push(spellToAdd);
        },
        (error) => {
            console.log(error);
            alert("error");
        }
    );
    clearform();
};

const clearform = () => {
    newSpell.name = "";
    newSpell.spellLevel = 0;
    newSpell.spellSchool = 0;
    newSpell.castingTime = 0;
    newSpell.range = "";
    newSpell.verbal = false;
    newSpell.somatic = false;
    newSpell.material = "";
    newSpell.duration = "";
    newSpell.class = [];
    newSpell.description = "";
};
</script>

<template>
    <div
        class="lg:w-8/12 sm:w-11/12 bg-green-300 p-6 rounded-lg text-left my-2 m-auto"
    >
        <p class="text-2xl">
            <input
                v-model="newSpell.name"
                type="text"
                placeholder="name"
                class="py-2 px-4"
            />
        </p>
        <p class="italic mt-4">
            <select v-model="newSpell.spellLevel">
                <option v-for="(lvl, index) in spelllvlarray" :value="index">
                    {{ lvl }}
                </option>
            </select>
            <select v-model="newSpell.spellSchool">
                <option v-for="(school, index) in schools" :value="index">
                    {{ school }}
                </option>
            </select>
        </p>
        <p>
            <span class="font-bold">Casting Time: </span>
            <select v-model="newSpell.castingTime">
                <option v-for="(time, index) in casting_times" :value="index">
                    {{ time }}
                </option>
            </select>
        </p>
        <p>
            <span class="font-bold">Range: </span
            ><input
                v-model="newSpell.range"
                type="text"
                placeholder="range"
                class="py-2 px-4"
            />
        </p>
        <p>
            <span class="font-bold">Components: </span>
            <label>
                <input type="checkbox" v-model="newSpell.verbal" />
                Verbal
            </label>
            <label>
                <input type="checkbox" v-model="newSpell.somatic" />
                Somatic
            </label>
            <label>
                <input type="checkbox" v-model="showMaterialInput" />
                Material
            </label>
            <label v-if="showMaterialInput">
                <input
                    type="text"
                    v-model="newSpell.material"
                    placeholder="material component(s)"
                    class="px-4"
                />
            </label>
        </p>
        <p>
            <span class="font-bold">Duration: </span>
            <input
                v-model="newSpell.duration"
                type="text"
                placeholder="duration"
                class="py-2 px-4"
            />
        </p>
        <p>
            <span class="font-bold">Classes: </span>
            <label v-for="(pcclass, index) in classes">
                <input
                    type="checkbox"
                    :value="index"
                    v-model="newSpell.class"
                    class="py-2 px-4"
                />
                {{ pcclass }}
            </label>
        </p>
        <p class="mt-4">
            <input
                v-model="newSpell.description"
                type="text"
                placeholder="description"
                class="py-2 px-4"
            />
        </p>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
            @click="addspell"
        >
            addspell
        </button>
    </div>
    <!-- testing -->
    <!-- <SpellVue :spell="newSpell" /> -->
</template>

<style scoped></style>
