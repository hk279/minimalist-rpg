export type Attributes = {
    strength: number,
    stamina: number,
    intelligence: number,
};

export type Attribute = "strength" | "stamina" | "intelligence";

export type CharacterClass = "Warrior" | "Mage" | "Priest";

export type DamageType = "physical" | "magic";

export type Skill = {
    name: string,
    damage: number;
    damageType: DamageType;
};