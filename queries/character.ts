import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";
import { useToast } from "@chakra-ui/react";
import { ItemRarity, ArmorSlot } from "./inventory";

export type Attributes = {
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
};

export type Attribute = "strength" | "intelligence" | "stamina" | "spirit";

export type DefenseAttribute = "armor" | "resistance";

export const characterClasses = ["Warrior", "Mage", "Priest"];

export type CharacterClass = "Warrior" | "Mage" | "Priest";

export type DamageType = "Physical" | "Magic";

export type TargetType = "Self" | "Friendly" | "Enemy";

type StatusEffect = {
  name: string;
  duration: number;
  damagePerTurn: number;
  healingPerTurn: number;
  increasedDamagePercentage: number;
  decreasedDamagePercentage: number;
  increasedDamageTakenPercentage: number;
  decreasedDamageTakenPercentage: number;
  isStunned: boolean;
  reducedStrengthPercentage: number;
  reducedIntelligencePercentage: number;
  reducedArmorPercentage: number;
  reducedResistancePercentage: number;
  increasedStrengthPercentage: number;
  increasedIntelligencePercentage: number;
  increasedArmorPercentage: number;
  increasedResistancePercentage: number;
};

export type StatusEffectInstance = {
  remainingDuration: number;
  statusEffect: StatusEffect;
};

export type Skill = {
  id: number;
  name: string;
  description: string;
  damageType: DamageType;
  targetType: TargetType;
  rank: number;
  weaponDamagePercentage: number;
  minBaseDamage: number;
  maxBaseDamage: number;
  energyCost: number;
  cooldown: number;
  statusEffect?: StatusEffect;
};

export type SkillInstance = {
  remainingCooldown: number;
  skill: Skill;
};

export type EquippedItem = {
  id: number;
  name: string;
  rarity: ItemRarity;
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
};

export type EquippedArmorPiece = EquippedItem & {
  slot: ArmorSlot;
  armor: number;
  resistance: number;
};

export type EquippedWeapon = EquippedItem & {
  minDamage: number;
  maxDamage: number;
};

export type CharacterListing = {
  id: number;
  name: string;
  level: number;
  avatar: string;
  class: CharacterClass;
};

export type Character = {
  id: number;
  name: string;
  avatar: string;
  level: number;
  nextLevelExperienceThreshold: number;
  currentLevelExperienceGained: number;
  unassignedAttributePoints: number;
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
  maxHitPoints: number;
  currentHitPoints: number;
  isDead: boolean;
  maxEnergy: number;
  currentEnergy: number;
  armor: number;
  resistance: number;
  class: CharacterClass;
  equippedWeapon?: EquippedWeapon;
  equippedArmorPieces: EquippedArmorPiece[];
  fightId?: number;
  inventorySize: number;
  skillInstances: SkillInstance[];
  statusEffectInstances: StatusEffectInstance[];
};

type CreateCharacterRequest = {
  name: string;
  avatar: string;
  characterClass: CharacterClass;
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
};

type AssignAttributePointsRequest = Attributes & {
  characterId: number;
};

export const useCharacterList = () => {
  const toast = useToast();

  return useQuery(
    ["characters"],
    () => axios.get("/characters").then((res): CharacterListing[] => res.data),
    {
      onError: () =>
        toast({ title: "Failed to get character list", status: "error" }),
    }
  );
};

export const useCharacter = (characterId?: number) => {
  const toast = useToast();

  return useQuery(
    ["characters", characterId],
    () =>
      axios
        .get(`/characters/${characterId}`)
        .then((res): Character => res.data),
    {
      enabled: characterId != null,
      onError: () =>
        toast({ title: "Failed to get character data", status: "error" }),
    }
  );
};

export const useEnemies = (characterId?: number) => {
  const toast = useToast();

  return useQuery(
    ["enemies", characterId],
    () =>
      axios
        .get(`/characters/${characterId}/enemies`)
        .then((res): Character[] => res.data),
    {
      enabled: characterId != null,
      onError: () =>
        toast({ title: "Failed to get enemy data", status: "error" }),
    }
  );
};

export const useCreateCharacter = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (input: CreateCharacterRequest) => axios.post("/characters", input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        toast({ title: "Character created", status: "success" });
      },
      onError: () => {
        toast({ title: "Character creation failed", status: "error" });
      },
    }
  );
};

export const useAssignAttributePoints = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (request: AssignAttributePointsRequest) =>
      axios.post(`/characters/assign-attribute-points`, request),
    {
      onSuccess: (_, request) => {
        queryClient.invalidateQueries({
          queryKey: ["characters", request.characterId],
        });
        toast({
          title: "Attribute points assigned successfully",
          status: "success",
        });
      },
      onError: () => {
        toast({ title: "Failed to assign attribute points", status: "error" });
      },
    }
  );
};
