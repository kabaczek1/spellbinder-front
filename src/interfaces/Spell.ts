export interface Spell {
    id: number;
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

export interface SpellToAdd {
    id?: number;
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
