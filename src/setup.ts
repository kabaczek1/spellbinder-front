import config from "./data/config.json";
import axios from "axios";
import { reactive } from "vue";
import { Spell } from "./interfaces/Spell";

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
