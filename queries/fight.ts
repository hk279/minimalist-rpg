import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

type PlayerActionRequest = {
  fightId: number;
  playerCharacterId: number;
  targetCharacterId?: number;
};

type PlayerSkillActionRequest = PlayerActionRequest & { skillId: number };

type ActionType = "Skill" | "WeaponAttack";

type FightStatus = "Ongoing" | "Victory" | "Defeat";

export type ActionResponse = {
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
  playerAction: ActionResponse;
  enemyActions: ActionResponse[];
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
  const { handleSuccessfulAttack } = useActionResponseHandler();

  return useMutation<PlayerActionResponse, AxiosError, PlayerActionRequest>(
    (request) =>
      axios.post("/fight/weapon-attack", request).then((res) => res.data.data),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        handleSuccessfulAttack(response);
      },
      onError: (error) => {
        toast({ title: "Error", status: "error", description: error.message });
      },
    }
  );
};

export const useUseSkill = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { handleSuccessfulAttack } = useActionResponseHandler();

  return useMutation<
    PlayerActionResponse,
    AxiosError,
    PlayerSkillActionRequest
  >(
    (request) =>
      axios.post("/fight/use-skill", request).then((res) => res.data.data),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        handleSuccessfulAttack(response);
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

  const handleSuccessfulAction = (response: PlayerActionResponse) => {
    toast({ title: "Action successful", status: "info" });

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

  return { handleSuccessfulAttack: handleSuccessfulAction };
};
