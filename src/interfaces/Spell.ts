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
    class: number[];
    description: string;
    show: boolean;
}

export interface BackendSpell {
    id?: number;
    name: string;
    description: string;
    spellLevel: number;
    spellSchoolId: number;
    verbal: boolean;
    somatic: boolean;
    material: string;
    range: string;
    duration: string;
    castingTimeId: number;
    classes: number[];
}

export interface ExportSpell {
    name: string;
    spellLevel: number;
    spellSchool: number;
    castingTime: number;
    range: string;
    verbal: boolean;
    somatic: boolean;
    material: string;
    duration: string;
    class: number[];
    description: string;
}
