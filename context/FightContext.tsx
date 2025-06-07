import { useRouter } from "next/router";
import { ReactNode, createContext, useContext, useState } from "react";
import { Character, useCharacter, useEnemies } from "../queries/character";
import LoadingPage from "../components/generic/LoadingPage";
import {
  useWeaponAttack,
  useUseSkill,
  PlayerActionResponse,
} from "../queries/fight";
import { useCharacterId } from "../hooks/useCharacterId";

interface FightContextInterface {
  character: Character;
  enemies: Character[];
  isMultiEnemyFight: boolean;
  targetId?: number;
  toggleTarget: (characterId: number) => void;
  returnToCharacter: () => void;
  isLoading: boolean;
  attackAction: () => void;
  skillAction: (skillId: number) => void;
  turnEvents?: PlayerActionResponse;
}

export const FightContext = createContext<FightContextInterface | null>(null);

export const FightProvider = (props: { children: ReactNode }) => {
  const router = useRouter();
  const characterId = useCharacterId();

  const { data: character, isLoading: characterLoading } =
    useCharacter(characterId);
  const { data: enemies, isLoading: enemiesLoading } = useEnemies(characterId);

  const { mutateAsync: attackAction, isLoading: isAttacking } =
    useWeaponAttack();
  const { mutateAsync: skillAction, isLoading: isUsingSkill } = useUseSkill();

  const [targetId, setTargetId] = useState<number>();
  const [turnEvents, setTurnEvents] = useState<PlayerActionResponse>();

  if (characterLoading || enemiesLoading) return <LoadingPage />;

  if (character == null || character.fightId == null || enemies == null) {
    return null;
  }

  const toggleTarget = (characterId: number) => {
    if (targetId === characterId) {
      setTargetId(undefined);
      return;
    }

    setTargetId(characterId);
  };

  const returnToCharacter = () => router.push(`/character/${character.id}`);

  const isLoading = isAttacking || isUsingSkill;
  const isMultiEnemyFight = enemies.length > 1;

  const attack = async () => {
    if (character?.fightId != null && targetId != null) {
      const attackResponse = await attackAction({
        fightId: character?.fightId,
        playerCharacterId: character.id,
        targetCharacterId: targetId,
      });

      const attackedEnemy = enemies.find((enemy) => enemy.id === targetId);

      // If the attacked enemy is dead, clear the target
      if (attackedEnemy?.isDead) setTargetId(undefined);

      setTurnEvents(attackResponse);
    }
  };

  const useSkill = async (skillId: number) => {
    if (character?.fightId != null && targetId != null) {
      const attackResponse = await skillAction({
        fightId: character?.fightId,
        skillId: skillId,
        playerCharacterId: character.id,
        targetCharacterId: targetId,
      });
      setTurnEvents(attackResponse);
    }
  };

  return (
    <FightContext.Provider
      value={{
        character,
        enemies,
        isMultiEnemyFight,
        targetId,
        toggleTarget,
        returnToCharacter,
        isLoading,
        attackAction: attack,
        skillAction: useSkill,
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
