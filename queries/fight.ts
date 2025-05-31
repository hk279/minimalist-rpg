import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { DamageType } from "./character";

type BeginFightResponse = {
  fightId: number;
  playerCharacterId: number;
  enemyCharacterIds: number[];
};

type PlayerActionRequest = {
  fightId: number;
  playerCharacterId: number;
  targetCharacterId?: number;
};

type PlayerSkillActionRequest = PlayerActionRequest & { skillId: number };

type ActionType = "Skill" | "WeaponAttack";

type FightStatus = "Ongoing" | "Victory" | "Defeat";

export type HitType = "Normal" | "WeakHit" | "CriticalHit";

export type DamageInstance = {
  totalDamage: number;
  damageType: DamageType;
  hitType: HitType;
};

export type ActionResponse = {
  characterId: number;
  characterName: string;
  targetCharacterId: number;
  targetCharacterName: string;
  actionType: ActionType;
  skillName?: string;
  damageInstance?: DamageInstance;
  healing: number;
};

export type PlayerActionResponse = {
  playerAction: ActionResponse;
  enemyActions: ActionResponse[];
  fightStatus: FightStatus;
  experienceGained?: number;
  hasLevelUp: boolean;
};

export const useStartFight = (playerCharacterId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<BeginFightResponse, AxiosError>(
    () => axios.post("/fight", { playerCharacterId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        router.push(`/character/${playerCharacterId}/fight`);
        toast({ title: "A fight has begun!", status: "success" });
      },
      onError: (error: AxiosError) => {
        toast({ title: "Error", status: "error", description: error.message });
      },
    }
  );
};

export const useWeaponAttack = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { handleSuccessfulAttack } = useActionResponseHandler();

  return useMutation<PlayerActionResponse, AxiosError, PlayerActionRequest>(
    (request) =>
      axios.post("/fight/weapon-attack", request).then((res) => res.data),
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
      axios.post("/fight/use-skill", request).then((res) => res.data),
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
    const { playerAction, fightStatus, experienceGained, hasLevelUp } =
      response;

    toast({ title: "Action successful", status: "info" });

    switch (fightStatus) {
      case "Victory":
        toast({
          title: "You are victorious!",
          description: `+${experienceGained} EXP`,
          status: "success",
        });

        if (hasLevelUp) {
          toast({
            title: "You have levelled up!",
            description: "+1 attribute point",
            status: "info",
          });
        }

        router.push(`/character/${playerAction.characterId}`);
        break;
      case "Defeat":
        toast({ title: "You have been defeated", status: "error" });
        router.push(`/character/${playerAction.characterId}`);
        break;
      default:
        break;
    }
  };

  return { handleSuccessfulAttack: handleSuccessfulAction };
};
