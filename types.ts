// TODO: Move to query files later

export type DamageType = "physical" | "magic";

export type TargetType = "self" | "friendly" | "enemy";

export type Skill = {
  name: string;
  damage: number;
  healing: number;
  damageType: DamageType;
  targetType: TargetType;
};
