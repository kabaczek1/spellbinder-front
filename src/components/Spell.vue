<script setup lang="ts">
import Spell from "../interfaces/Spell";
import { classes, casting_times, schools } from "../main";
import spelllvlarray from "../data/spelllvlarray.json";

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
    </div>
</template>

<style scoped></style>
