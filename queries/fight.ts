import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type AttackRequest = {
  fightId: number;
  playerCharacterId: number;
  enemyCharacterId: number;
};

type SkillAttackRequest = AttackRequest & { skillId: number };

export const useStartFight = (characterId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(() => axios.post(`/fight/${characterId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      queryClient.invalidateQueries({ queryKey: ["enemies"] });
      toast({ title: "A fight has begun!", status: "success" });
    },
    onError: () => {
      toast({ title: "Error", status: "error" });
    },
  });
};

export const useWeaponAttack = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (request: AttackRequest) => axios.post("/fight/weapon-attack", request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["characters"] });
        queryClient.invalidateQueries({ queryKey: ["enemies"] });
        toast({ title: "Attack successful", status: "success" });
      },
      onError: () => {
        toast({ title: "Error", status: "error" });
      },
    }
  );
};
