import axios from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

type Weapon = {
  name: string;
  damage: number;
};

export type DamageType = "physical" | "magic";

export type TargetType = "Self" | "Friendly" | "Enemy";

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
  level: number;
  avatar: string;
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
  weapon?: Weapon;
  class: CharacterClass;
  skills: Skill[];
  fightId?: number;
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
    "characters",
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
