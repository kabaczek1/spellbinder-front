import config from "./data/config.json";
import axios from "axios";
import { reactive, ref } from "vue";
import { Spell, SpellToAdd } from "./interfaces/Spell";

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
    return res.data;
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
