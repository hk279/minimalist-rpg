import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AttackRequest = {
  fightId: number;
  playerCharacterId: number;
  enemyCharacterId: number;
};

type SkillAttackRequest = AttackRequest & { skillId: number };

type ActionType = "Skill" | "WeaponAttack";

type FightStatus = "Ongoing" | "Victory" | "Defeat";

export type Action = {
  characterId: number;
  characterName: string;
  targetCharacterId: number;
  targetCharacterName: string;
  actionType: ActionType;
  skillName?: string;
  damage: number;
  healing: number;
};

export type PlayerActionResponse = {
  playerAction: Action;
  enemyActions: Action[];
  fightStatus: FightStatus;
};

export const useStartFight = (characterId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(() => axios.post(`/fight/${characterId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      queryClient.invalidateQueries({ queryKey: ["enemies"] });
      toast({ title: "A fight has begun!", status: "success" });
    },
    onError: (error: AxiosError) => {
      toast({ title: "Error", status: "error", description: error.message });
    },
  });
};

export const useWeaponAttack = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation<PlayerActionResponse, AxiosError, AttackRequest>(
    (request) =>
      axios.post("/fight/weapon-attack", request).then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        toast({ title: "Attack successful", status: "success" });
      },
      onError: (error) => {
        toast({ title: "Error", status: "error", description: error.message });
      },
    }
  );
};

export const useSkillAttack = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation<PlayerActionResponse, AxiosError, SkillAttackRequest>(
    (request) =>
      axios.post("/fight/skill-attack", request).then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        toast({ title: "Attack successful", status: "success" });
      },
      onError: (error) => {
        toast({ title: "Error", status: "error", description: error.message });
      },
    }
  );
};
