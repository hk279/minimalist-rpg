import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";
import { useToast } from "@chakra-ui/react";

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

export type ItemType = "Weapon" | "ArmorPiece";

export type ItemRarity = "Common" | "Uncommon" | "Rare" | "Epic";

export type ArmorSlot = "Head" | "Chest" | "Hands" | "Legs" | "Feet";

export const armorSlots = ["Head", "Chest", "Hands", "Legs", "Feet"];

export type Skill = {
  id: number;
  name: string;
  minDamage: number;
  maxDamage: number;
  healing: number;
  energyCost: number;
  cooldown: number;
  remainingCooldown: number;
  damageType: DamageType;
  targetType: TargetType;
};

export type Item = {
  id: number;
  name: string;
  type: ItemType;
  level: number;
  rarity: ItemRarity;
  description: string;
  weight: number;
  value: number;
  isEquipped: boolean;
  strength: number;
  intelligence: number;
  stamina: number;
  spirit: number;
  minDamage?: number;
  maxDamage?: number;
  armorSlot?: ArmorSlot;
  armor?: number;
  resistance?: number;
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

export const useCharacterInventory = (characterId: number) => {
  const toast = useToast();

  return useQuery(
    ["inventory", characterId],
    () =>
      axios
        .get(`/Character/${characterId}/inventory`)
        .then((res): Item[] => res.data.data),
    {
      onError: (err) =>
        toast({ title: "Failed to get character inventory", status: "error" }),
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
