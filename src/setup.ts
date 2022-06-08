import config from "./data/config.json";
import axios from "axios";
import { reactive, ref } from "vue";
import { Spell, SpellToAdd, BackendSpell } from "./interfaces/Spell";

async function makearrayfromapi(route: string) {
    const res = await axios.get(`${config.backend}/${route}`);
    const output: Array<string> = [];
    res.data.forEach((element: { id: number; name: string }) => {
        output[element.id] = element.name;
    });
    output[0] = "none";
    return output;
}

async function getspells(): Promise<Spell[]> {
    const res = await axios.get(`${config.backend}/spells`);
    const output: Spell[] = [];
    res.data.forEach((spell: BackendSpell) => {
        let x: Spell = {
            id: spell.id,
            name: spell.name,
            spellLevel: spell.spellLevel,
            spellSchool: spell.spellSchoolId,
            castingTime: spell.castingTimeId,
            range: spell.range,
            verbal: spell.verbal,
            somatic: spell.somatic,
            material: spell.material,
            duration: spell.duration,
            class: spell.classes,
            description: spell.description,
        };
        output.push(x);
    });
    output.sort((a, b) => {
        return a.id - b.id;
    });
    return output;
}

export const spells = reactive(await getspells());
export const classes = reactive(await makearrayfromapi("classes"));
export const schools = reactive(await makearrayfromapi("spellschools"));
export const casting_times = reactive(await makearrayfromapi("castingtimes"));

export const blankSpell: SpellToAdd = {
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

export const showAddForm = ref(false);
export const spellToUpdateId = ref(-1);
export const newSpell: SpellToAdd = reactive(blankSpell);
