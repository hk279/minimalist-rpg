// TODO: Move to query files later

export type DamageType = "physical" | "magic";

export type TargetType = "self" | "friendly" | "enemy";

export type Skill = {
  id: number;
  name: string;
  damage: number;
  healing: number;
  energyCost: number;
  cooldown: number;
  damageType: DamageType;
  targetType: TargetType;
};
