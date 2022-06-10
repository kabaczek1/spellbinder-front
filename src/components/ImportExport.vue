<script setup lang="ts">
import { reactive, ref } from "vue";
import { Spell, ExportSpell, BackendSpell } from "../interfaces/Spell";
import SpellVue from "./Spell.vue";
import { spells, classes, casting_times, schools } from "../setup";
import spelllvlarray from "../data/spelllvlarray.json";

import axios from "axios";
import config from "../data/config.json";

const fileformat = ref("json");
const exportOnlyShown = ref(false);
const importData = ref("");
// const file = ref(null);

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

// i hate myself for writing that code
const xmltospells = (xml_string: string): ExportSpell[] => {
    const spellsToImport: ExportSpell[] = [];
    const parser = new DOMParser();
    const xml = parser.parseFromString(xml_string, "text/xml");

    //console.log(xml.documentElement.childNodes);
    xml.documentElement.childNodes.forEach((node) => {
        let spell: ExportSpell = {};
        //console.log(node);
        node.childNodes.forEach((node) => {
            if (node.nodeName != "classes") {
                //console.log(node.nodeName);
                if (node.nodeName == "material") {
                    try {
                        spell.material = node.childNodes[0].nodeValue;
                        //console.log(node.childNodes[0].nodeValue);
                    } catch (e) {
                        //console.log("");
                        spell.material = "";
                    }
                } else {
                    if (node.nodeName == "name")
                        spell.name = node.childNodes[0].nodeValue;
                    if (node.nodeName == "spellLevel")
                        spell.spellLevel = Number(node.childNodes[0].nodeValue);
                    if (node.nodeName == "spellSchool")
                        spell.spellSchool = Number(
                            node.childNodes[0].nodeValue
                        );
                    if (node.nodeName == "castingTime")
                        spell.castingTime = Number(
                            node.childNodes[0].nodeValue
                        );
                    if (node.nodeName == "range")
                        spell.range = node.childNodes[0].nodeValue;
                    if (node.nodeName == "verbal")
                        spell.verbal = Boolean(node.childNodes[0].nodeValue);
                    if (node.nodeName == "somatic")
                        spell.somatic = Boolean(node.childNodes[0].nodeValue);
                    if (node.nodeName == "duration")
                        spell.duration = node.childNodes[0].nodeValue;
                    if (node.nodeName == "description")
                        spell.description = node.childNodes[0].nodeValue;
                    //console.log(node.childNodes[0].nodeValue);
                }
            } else {
                //console.log("classes propapapbyu");
                spell.class = [];
                node.childNodes.forEach((node) => {
                    //console.log(node.nodeName);
                    //console.log(node.childNodes[0].nodeValue);
                    spell.class.push(
                        Number(
                            node.childNodes[0].nodeValue as unknown as number
                        )
                    );
                });
            }
        });
        //console.log(spell);
        spellsToImport.push(spell);
    });
    return spellsToImport;
};

const import_data = () => {
    let spellsToImport: ExportSpell[] = [];
    //console.log("import");

    if (fileformat.value == "json") {
        try {
            spellsToImport = JSON.parse(importData.value);
        } catch (a) {
            alert("JSON import error");
        }
    }

    if (fileformat.value == "xml") {
        try {
            spellsToImport = xmltospells(importData.value);
        } catch (a) {
            alert("XML import error");
        }
    }
    console.log(spellsToImport);
    spellsToImport.forEach((spell) => {
        console.log(spell);
        console.log(JSON.stringify(spell));
        const spellToAdd: BackendSpell = {
            name: spell.name,
            spellLevel: spell.spellLevel,
            spellSchoolId: spell.spellSchool,
            castingTimeId: spell.castingTime,
            range: spell.range,
            verbal: spell.verbal,
            somatic: spell.somatic,
            material: spell.material,
            duration: spell.duration,
            classes: spell.class,
            description: spell.description,
        };
        axios.post(`${config.backend}/spells`, spellToAdd).then(
            (response) => {
                spells.push({
                    id: response.data.id,
                    name: response.data.name,
                    spellLevel: response.data.spellLevel,
                    spellSchool: response.data.spellSchoolId,
                    castingTime: response.data.castingTimeId,
                    range: response.data.range,
                    verbal: response.data.verbal,
                    somatic: response.data.somatic,
                    material: response.data.material,
                    duration: response.data.duration,
                    class: response.data.classes,
                    description: response.data.description,
                    show: true,
                });
                spells.sort((a, b) => {
                    return a.id - b.id;
                });
                console.log(spells);
            },
            (error) => {
                console.log(error);
                alert("error");
            }
        );
    });
};
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

    const makeSpellsXML = (spellsToExport: ExportSpell[]): string => {
        let xml = '<?xml version="1.0" encoding="UTF-8" ?><spells>';
        spellsToExport.forEach((spell) => {
            xml += "<spell>";
            Object.entries(spell).forEach(([key, value]) => {
                if (key != "class") {
                    xml += `<${key}>`;
                    xml += value;
                    xml += `</${key}>`;
                }
            });
            xml += "<classes>";
            spell.class.forEach((class_id) => {
                xml += "<class>";
                xml += class_id;
                xml += "</class>";
            });
            xml += "</classes>";
            xml += "</spell>";
        });
        xml += "</spells>";
        return xml;
    };

    let spellsToExport: ExportSpell[] = [];
    if (exportOnlyShown.value) {
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

    if (fileformat.value == "json") {
        filename += ".json";
        data = JSON.stringify(spellsToExport);
    }
    if (fileformat.value == "xml") {
        filename += ".xml";
        data = makeSpellsXML(spellsToExport);
    }
    //console.log(filename);
    //console.log(data);
    download_file(data, filename, "text/plain");
};

// const fileInputChange = (event: Event) => {
//     const f: File = event.target.files[0];
//     const reader = new FileReader();

//     console.log(reader.readAsText(f));

//     console.log(f);
//     console.log(file.value);
// };
</script>

<template>
    <div
        class="lg:w-8/12 sm:w-11/12 bg-green-300 p-6 rounded-lg text-left my-2 m-auto"
    >
        <label
            ><input type="checkbox" v-model="exportOnlyShown" />Export only
            currently shown spells</label
        ><br />
        <span class="font-bold">{{
            exportOnlyShown
                ? "Only currently shown spells will be exported"
                : "All spells will be exported"
        }}</span>
        <p>
            <span class="font-bold">File format: </span>
            <select v-model="fileformat">
                <option value="json">JSON</option>
                <option value="xml">XML</option>
            </select>
        </p>
        <!-- <input
            type="file"
            id="file-selector"
            :accept="'.' + fileformat"
            ref="file"
            @change="fileInputChange($event)"
        /><br /> -->
        <p>
            <span class="font-bold">Paste import data here: </span>
            <input type="text" v-model="importData" />
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
