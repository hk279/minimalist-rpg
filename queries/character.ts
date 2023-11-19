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

export type SecondaryAttribute = "armor" | "resistance";

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
  remainingCooldown: number;
  statusEffect?: StatusEffect;
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
  currentLevelTotalExperience: number;
  experienceTowardsNextLevel: number;
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
  maxHitPoints: number;
  currentHitPoints: number;
  maxEnergy: number;
  currentEnergy: number;
  armor: number;
  resistance: number;
  class: CharacterClass;
  skills: Skill[];
  equippedWeapon?: EquippedWeapon;
  equippedArmorPieces: EquippedArmorPiece[];
  fightId?: number;
  inventorySize: number;
};

type CreateCharacterInput = {
  name: string;
  avatar: string;
  class: CharacterClass;
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
};

export const useCharacterList = () => {
  const toast = useToast();

  return useQuery(
    ["characters"],
    () =>
      axios
        .get("/Character/all")
        .then((res): CharacterListing[] => res.data.data),
    {
      onError: () =>
        toast({ title: "Failed to get character list", status: "error" }),
    }
  );
};

export const useCharacter = (characterId: number) => {
  const toast = useToast();

  return useQuery(
    ["characters", characterId],
    () =>
      axios
        .get(`/Character/${characterId}`)
        .then((res): Character => res.data.data),
    {
      onError: () =>
        toast({ title: "Failed to get character data", status: "error" }),
    }
  );
};

export const useEnemies = (characterId: number) => {
  const toast = useToast();

  return useQuery(
    ["enemies", characterId],
    () =>
      axios
        .get(`/Character/${characterId}/enemies`)
        .then((res): Character[] => res.data.data),
    {
      onError: () =>
        toast({ title: "Failed to get enemy data", status: "error" }),
    }
  );
};

export const useCreateCharacter = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (input: CreateCharacterInput) => axios.post("/Character", input),
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
