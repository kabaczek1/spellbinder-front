<script setup lang="ts">
import { reactive, ref } from "vue";
import Spell from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import { spells, classes, casting_times, schools } from "../main";
import spelllvlarray from "../data/spelllvlarray.json";

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
    //validate form
    //send to db
    //if sent properly get id and push to local array
    spells.push({
        spellId: spells.length,
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
    });
    //if not sent properly show alert
};
</script>

<template>
    <div
        class="lg:w-8/12 sm:w-11/12 bg-green-300 p-6 rounded-lg text-left my-2 m-auto"
    >
        <button @click="addspell">addspell</button><br />
        <input v-model="newSpell.name" type="text" placeholder="name" /><br />
        <label
            >Spell level:
            <select v-model="newSpell.spellLevel">
                <option v-for="(lvl, index) in spelllvlarray" :value="index">
                    {{ lvl }}
                </option>
            </select>
        </label>
        <label
            >School of magic:
            <select v-model="newSpell.spellSchool">
                <option v-for="(school, index) in schools" :value="index">
                    {{ school }}
                </option>
            </select>
        </label>
        <label
            >Casting time:
            <select v-model="newSpell.castingTime">
                <option v-for="(time, index) in casting_times" :value="index">
                    {{ time }}
                </option>
            </select>
        </label>
        <input v-model="newSpell.range" type="text" placeholder="range" /><br />
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
            <input type="text" v-model="newSpell.material" />
            specify Material component
        </label>
        <input
            v-model="newSpell.duration"
            type="text"
            placeholder="duration"
        /><br />
        <label v-for="(pcclass, index) in classes">
            <input type="checkbox" :value="index" v-model="newSpell.class" />
            {{ pcclass }}
        </label>
        <input
            v-model="newSpell.description"
            type="text"
            placeholder="description"
        /><br />
    </div>
    <SpellVue :spell="newSpell" />
</template>

<style scoped></style>
