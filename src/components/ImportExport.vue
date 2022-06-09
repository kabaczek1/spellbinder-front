<script setup lang="ts">
import { reactive, ref } from "vue";
import { Spell, ExportSpell } from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import { spells, classes, casting_times, schools } from "../setup";
import spelllvlarray from "../data/spelllvlarray.json";

const fileformat = ref("JSON");
const exportOnlyShown = ref(false);

const download_file = (data: string, filename: string, type: string) => {
    const file = new Blob([data], { type: type });
    const a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

const import_data = () => {};
const export_data = () => {
    const date = new Date();
    let data: string = "";
    let filename = `spells_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}_${date.getTime()}`;

    const addSpellToExportArray = (spell: Spell) => {
        spellsToExport.push({
            name: spell.name,
            spellLevel: spell.spellLevel,
            spellSchool: spell.spellSchool,
            castingTime: spell.castingTime,
            range: spell.range,
            verbal: spell.verbal,
            somatic: spell.somatic,
            material: spell.material,
            duration: spell.duration,
            class: spell.class,
            description: spell.description,
        });
    };

    let spellsToExport: ExportSpell[] = [];
    if (exportOnlyShown.value) {
        console.log("asdasdasdasdasdsda");
        spells.forEach((spell) => {
            if (spell.show) {
                addSpellToExportArray(spell);
            }
        });
    } else {
        spells.forEach((spell) => {
            addSpellToExportArray(spell);
        });
    }

    if (fileformat.value == "JSON") {
        filename += ".json";
        data = JSON.stringify(spellsToExport);
    }
    if (fileformat.value == "XML") {
        filename += ".xml";
    }
    console.log(filename);
    console.log(data);
    //download_file("test", filename, "text/plain");
};
</script>

<template>
    <div
        class="lg:w-8/12 sm:w-11/12 bg-green-300 p-6 rounded-lg text-left my-2 m-auto"
    >
        <label
            ><input type="checkbox" v-model="exportOnlyShown" />Export only
            currently shown spells</label
        >
        <p>
            <span class="font-bold">File format: </span>
            <select v-model="fileformat">
                <option value="JSON">JSON</option>
                <option value="XML">XML</option>
            </select>
        </p>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
            @click="export_data"
        >
            Export
        </button>
        <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4"
            @click="import_data"
        >
            Import
        </button>
    </div>
</template>

<style scoped></style>
