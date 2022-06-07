<script setup lang="ts">
import { Spell } from "../interfaces/Spell";
import { spells, classes, casting_times, schools } from "../setup";
import spelllvlarray from "../data/spelllvlarray.json";
import axios from "axios";
import config from "../data/config.json";

const props = defineProps<{
    spell: Spell;
}>();

const classes_string = (classes: Array<string>, id_list: Array<number>) => {
    let output: Array<string> = [];
    id_list.forEach((element, i) => {
        output[i] = classes[element];
    });
    return output.join(", ");
};

const components = (v: boolean, s: boolean, m: string) => {
    let comp_arr: string[] = [];
    if (v) comp_arr.push("V");
    if (s) comp_arr.push("S");
    if (m != "") comp_arr.push(`M (${m})`);
    return comp_arr.join(", ");
};

const deleteSpell = (id: number) => {
    console.log(spells);
    axios.delete(`${config.backend}/spells/${id}`).then(
        (response) => {
            console.log(response);
            spells.forEach((spell) => {
                if (spell.id == id) {
                    spells.splice(spells.indexOf(spell), 1);
                }
            });
            console.log(spells);
        },
        (error) => {
            console.log(error);
            alert("delete spell error");
        }
    );
    console.log(spells);
};
</script>

<template>
    <div
        class="lg:w-8/12 sm:w-11/12 bg-green-300 p-6 rounded-lg text-left my-2 m-auto"
    >
        <p class="text-2xl">{{ spell.name }}</p>
        <p class="italic mt-4">
            {{ spelllvlarray[spell.spellLevel] }}
            {{ schools[spell.spellSchool] }}
        </p>
        <p>
            <span class="font-bold">Casting Time:</span>
            {{ casting_times[spell.castingTime] }}
        </p>
        <p><span class="font-bold">Range:</span> {{ spell.range }}</p>
        <p>
            <span class="font-bold">Components:</span>
            {{ components(spell.verbal, spell.somatic, spell.material) }}
        </p>
        <p><span class="font-bold">Duration:</span> {{ spell.duration }}</p>
        <p>
            <span class="font-bold">Classes:</span>
            {{ classes_string(classes, spell.class) }}
        </p>
        <p class="mt-4">{{ spell.description }}</p>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
            @click="deleteSpell(spell.id)"
        >
            delete
        </button>
    </div>
</template>

<style scoped></style>
