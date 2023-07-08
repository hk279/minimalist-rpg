import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type AttackRequest = {
  fightId: number;
  attackerId: number;
  targetId: number;
};

type SkillAttackRequest = AttackRequest & { skillId: number };

export const useWeaponAttack = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (request: AttackRequest) => axios.post("/fight/weapon-attack", request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["characters", "enemies"] });
        toast({ title: "Attack successful", status: "success" });
      },
      onError: () => {
        toast({ title: "Error", status: "error" });
      },
    }
  );
};
