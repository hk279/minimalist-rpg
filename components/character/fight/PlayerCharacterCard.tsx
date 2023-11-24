import { Card } from "@chakra-ui/react";
import useFightContext from "../../../context/FightContext";
import CharacterCardHeader from "./CharacterCardHeader";
import CharacterCardBody from "./CharacterCardBody";
import CharacterCardFooter from "./CharacterCardFooter";

const PlayerCharacterCard = () => {
  const { character } = useFightContext();

  return (
    <Card>
      <CharacterCardHeader character={character} />

      <CharacterCardBody character={character} />

      <CharacterCardFooter />
    </Card>
  );
};

export default PlayerCharacterCard;
