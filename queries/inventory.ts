import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type ItemType = "Weapon" | "ArmorPiece";

export type ItemRarity = "Common" | "Uncommon" | "Rare" | "Epic";

export type ArmorSlot = "Head" | "Chest" | "Hands" | "Legs" | "Feet";

export const armorSlots = ["Head", "Chest", "Hands", "Legs", "Feet"];

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

export const useCharacterInventory = (characterId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const useGetInventory = () =>
    useQuery(
      ["inventory", characterId],
      () =>
        axios
          .get(`/inventory/${characterId}`)
          .then((res): Item[] => res.data.data),
      {
        onError: () =>
          toast({
            title: "Failed to get character inventory",
            status: "error",
          }),
      }
    );

  const useEquipItem = () =>
    useMutation(
      (itemId: number) =>
        axios.post(`/inventory/${characterId}/equipItem/${itemId}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["characters", characterId],
          });
          queryClient.invalidateQueries({
            queryKey: ["inventory", characterId],
          });
          toast({ title: "Item equipped", status: "success" });
        },
        onError: () => {
          toast({ title: "Failed to equip item", status: "error" });
        },
      }
    );

  return {
    useGetInventory,
    useEquipItem,
  };
};
