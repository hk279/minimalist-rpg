import { Card } from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import useFightContext from "../../../context/FightContext";
import CharacterCardHeader from "./CharacterCardHeader";
import CharacterCardBody from "./CharacterCardBody";

const EnemyCharacterCard = ({ character }: { character: Character }) => {
  const { toggleTarget, targetId } = useFightContext();

  return (
    <Card
      onClick={() => toggleTarget(character.id)}
      cursor="pointer"
      boxShadow={targetId === character.id ? "0px 0px 0px 4px #319795" : "base"}
    >
      <CharacterCardHeader character={character} />

      <CharacterCardBody character={character} />
    </Card>
  );
};

export default EnemyCharacterCard;
