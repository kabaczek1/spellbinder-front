export default interface Spell {
    spellId?: number;
    name: string;
    spellLevel: number;
    spellSchool: number;
    castingTime: number;
    range: string;
    verbal: boolean;
    somatic: boolean;
    material: string;
    duration: string;
    class: Array<number>;
    description: string;
}
