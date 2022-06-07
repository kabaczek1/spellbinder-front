<script setup lang="ts">
import { reactive, ref } from "vue";
import { Spell, SpellToAdd } from "../interfaces/Spell";
import { spells, classes, casting_times, schools } from "../setup";
import spelllvlarray from "../data/spelllvlarray.json";
import config from "../data/config.json";

import axios from "axios";

const showMaterialInput = ref(false);

const blankSpell: SpellToAdd = {
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

const newSpell: SpellToAdd = reactive(blankSpell);

const addspell = () => {
    //validation
    let validation_info = "";
    if (newSpell.name == "") validation_info += "Spell must have a name\n";
    if (newSpell.spellLevel < 0 && newSpell.spellLevel > 9)
        validation_info += "Spell level must be between 0 and 9\n";
    if (newSpell.spellSchool < 1 || newSpell.spellSchool > 8)
        validation_info += "Spell school must be selected\n";
    if (newSpell.castingTime < 1 || newSpell.castingTime > 7)
        validation_info += "Casting time must be selected\n";
    if (newSpell.range == "") validation_info += "Spell must have a range\n";
    if (newSpell.duration == "")
        validation_info += "Spell must have a duration\n";
    if (newSpell.class.length == 0)
        validation_info += "Select at least one class\n";
    if (newSpell.description == "")
        validation_info += "Spell must have a description\n";
    if (validation_info != "") {
        alert(validation_info);
        return;
    }
    const spellToAdd: SpellToAdd = {
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
            //console.log(response.data.id);
            spellToAdd.id = response.data.id;
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
                    v-if="index != 0"
                />
                <span v-if="index != 0">{{ pcclass }}</span>
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
</template>

<style scoped></style>
