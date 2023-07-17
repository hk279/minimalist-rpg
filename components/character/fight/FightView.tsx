import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Center, Button, HStack, Icon, Stack } from "@chakra-ui/react";
import { GiCrossedSwords } from "react-icons/gi";
import useFightContext from "../../../context/FightContext";
import EnemyCharacterCard from "./EnemyCharacterCard";
import PlayerCharacterCard from "./PlayerCharacterCard";
import FightLog from "./FightLog";

const FightView = () => {
  const { returnToCharacter, enemies } = useFightContext();

  return (
    <Center h="100vh" bgColor="teal.50">
      <Button
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
        top={8}
        left={8}
        position="absolute"
        onClick={returnToCharacter}
      >
        Back
      </Button>

      <HStack gap={32}>
        <PlayerCharacterCard />

        <Stack alignItems="center">
          <Icon as={GiCrossedSwords} boxSize={32} color="teal" />
          <FightLog />
        </Stack>

        <Stack>
          {enemies.map((e) => (
            <EnemyCharacterCard key={e.id} character={e} />
          ))}
        </Stack>
      </HStack>
    </Center>
  );
};

export default FightView;
