import { createApp } from "vue";
import { reactive } from "vue";
import App from "./App.vue";
import "./index.css";

//get data
import sample_spells from "./data/spells.json";
import sample_classes from "./data/classes.json";
import sample_schools from "./data/schools.json";
import sample_casting_times from "./data/castingTimes.json";
//export state
export const spells = reactive(sample_spells);
export const classes = reactive(sample_classes);
export const schools = reactive(sample_schools);
export const casting_times = reactive(sample_casting_times);

createApp(App).mount("#app");
