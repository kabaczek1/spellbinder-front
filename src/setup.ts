import config from "./data/config.json";
import axios from "axios";
import { reactive } from "vue";
import Spell from "./interfaces/Spell";

async function makearrayfromapi(route: string) {
    const res = await axios.get(`${config.backend}/${route}`);
    const output: Array<string> = [];
    console.log(res.data);
    res.data.forEach((element: { id: number; name: string }) => {
        console.log(element.id);
        console.log(element.name);
        output[element.id] = element.name;
    });
    console.log(output);
    return output;
}

async function getspells(): Promise<Spell[]> {
    const res = await axios.get(`${config.backend}/spells`);
    console.log(res.data);
    return res.data;
}

export const spells = reactive(await getspells());
export const classes = reactive(await makearrayfromapi("classes"));
export const schools = reactive(await makearrayfromapi("spellschools"));
export const casting_times = reactive(await makearrayfromapi("castingtimes"));
