import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return useMutation(() => axios.post(`/fight/${characterId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      queryClient.invalidateQueries({ queryKey: ["enemies"] });
      router.push(`/character/${characterId}/fight`);
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
  const { handleSuccessfullAttack } = useActionResponseHandler();

  return useMutation<PlayerActionResponse, AxiosError, AttackRequest>(
    (request) =>
      axios.post("/fight/weapon-attack", request).then((res) => res.data.data),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        handleSuccessfullAttack(response);
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
  const { handleSuccessfullAttack } = useActionResponseHandler();

  return useMutation<PlayerActionResponse, AxiosError, SkillAttackRequest>(
    (request) =>
      axios.post("/fight/skill-attack", request).then((res) => res.data.data),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        handleSuccessfullAttack(response);
      },
      onError: (error) => {
        toast({ title: "Error", status: "error", description: error.message });
      },
    }
  );
};

const useActionResponseHandler = () => {
  const toast = useToast();
  const router = useRouter();

  const handleSuccessfullAttack = (response: PlayerActionResponse) => {
    toast({ title: "Attack successful", status: "info" });

    switch (response.fightStatus) {
      case "Victory":
        toast({ title: "You are victorious!", status: "success" });
        router.push(`/character/${response.playerAction.characterId}`);
        break;
      case "Defeat":
        toast({ title: "You have been defeated", status: "error" });
        router.push(`/character/${response.playerAction.characterId}`);
        break;
      default:
        break;
    }
  };

  return { handleSuccessfullAttack };
};
