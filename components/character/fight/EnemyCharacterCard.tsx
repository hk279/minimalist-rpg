import { Card } from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import useFightContext from "../../../context/FightContext";
import CharacterCardHeader from "./CharacterCardHeader";
import CharacterCardBody from "./CharacterCardBody";
import MultiEnemyCharacterCardBody from "./MultiEnemyCharacterCardBody";

type Props = {
  character: Character;
};

const EnemyCharacterCard = ({ character }: Props) => {
  const { toggleTarget, targetId, isMultiEnemyFight } = useFightContext();

  const toggleTargetEnemy = (characterId: number) => {
    if (character.isDead) return;
    toggleTarget(characterId);
  };

  return (
    <Card
      onClick={() => toggleTargetEnemy(character.id)}
      cursor={character.isDead ? "default" : "pointer"}
      boxShadow={targetId === character.id ? "0px 0px 0px 4px #319795" : "base"}
      backgroundColor={character.isDead ? "gray.200" : "white"}
    >
      <CharacterCardHeader character={character} />

      {isMultiEnemyFight ? (
        <MultiEnemyCharacterCardBody character={character} />
      ) : (
        <CharacterCardBody character={character} />
      )}
    </Card>
  );
};

export default EnemyCharacterCard;
