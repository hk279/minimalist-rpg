import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";
import { Character, useCharacter, useEnemies } from "../queries/character";
import LoadingPage from "../components/generic/LoadingPage";
import {
  useWeaponAttack,
  useSkillAttack,
  PlayerActionResponse,
} from "../queries/fight";

interface FightContextInterface {
  character: Character;
  enemies: Character[];
  targetId?: number;
  toggleTarget: (characterId: number) => void;
  returnToCharacter: () => void;
  isAttacking: boolean;
  attackWithWeapon: () => void;
  attackWithSkill: (skillId: number) => void;
  turnEvents?: PlayerActionResponse;
}

export const FightContext = createContext<FightContextInterface | null>(null);

export const FightProvider = (props: { children: ReactNode }) => {
  const router = useRouter();
  const toast = useToast();
  const characterId = Number(router.query.id);
  const { data: character } = useCharacter(characterId);
  const { data: enemies } = useEnemies(characterId);
  const { mutateAsync: weaponAttack, isLoading: isAttackingWithWeapon } =
    useWeaponAttack();
  const { mutateAsync: skillAttack, isLoading: isAttackingWithSkill } =
    useSkillAttack();

  const [targetId, setTargetId] = useState<number>();
  const [turnEvents, setTurnEvents] = useState<PlayerActionResponse>();

  if (character == null || enemies == null) return <LoadingPage />;

  // TODO: Handle victory / defeat
  if (character != null && character.fightId == null) {
    router.push(`/character/${character.id}`);
    toast({ title: "Character is not in a fight", status: "error" });
  }

  const toggleTarget = (characterId: number) => {
    if (targetId === characterId) {
      setTargetId(undefined);
      return;
    }

    setTargetId(characterId);
  };

  const returnToCharacter = () => router.push(`/character/${character.id}`);

  const isAttacking = isAttackingWithWeapon || isAttackingWithSkill;

  const attackWithWeapon = async () => {
    if (character?.fightId != null && targetId != null) {
      const attackResponse = await weaponAttack({
        fightId: character?.fightId,
        playerCharacterId: character.id,
        enemyCharacterId: targetId,
      });
      setTurnEvents(attackResponse);
    }
  };

  const attackWithSkill = async (skillId: number) => {
    if (character?.fightId != null && targetId != null) {
      const attackResponse = await skillAttack({
        fightId: character?.fightId,
        skillId: skillId,
        playerCharacterId: character.id,
        enemyCharacterId: targetId,
      });
      setTurnEvents(attackResponse);
    }
  };

  return (
    <FightContext.Provider
      value={{
        character,
        enemies,
        targetId,
        toggleTarget,
        returnToCharacter,
        isAttacking,
        attackWithWeapon,
        attackWithSkill,
        turnEvents,
      }}
    >
      {props.children}
    </FightContext.Provider>
  );
};

const useFightContext = () => {
  const context = useContext(FightContext);

  if (context == null) throw new Error("Using context outside of its Provider");

  return context;
};

export default useFightContext;