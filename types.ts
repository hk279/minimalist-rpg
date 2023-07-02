export type Attributes = {
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
};

export type Attribute = "strength" | "intelligence" | "stamina" | "spirit";

export type SecondaryAttribute = "armor" | "resistance";

export type CharacterClass = "Warrior" | "Mage" | "Priest";

export type DamageType = "physical" | "magic";

export type Skill = {
  name: string;
  damage: number;
  damageType: DamageType;
};
