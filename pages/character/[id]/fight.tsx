import {
  Button,
  Center,
  HStack,
  Icon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useCharacter, useEnemies } from "../../../queries/character";
import { useRouter } from "next/router";
import LoadingPage from "../../../components/generic/LoadingPage";
import PlayerCharacterCard from "../../../components/character/fight/PlayerCharacterCard";
import { GiCrossedSwords } from "react-icons/gi";
import EnemyCharacterCard from "../../../components/character/fight/EnemyCharacterCard";
import { useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

// TODO: Create a react context for the fight

const Fight = () => {
  const router = useRouter();
  const toast = useToast();
  const characterId = Number(router.query.id);
  const { data: character } = useCharacter(characterId);
  const { data: enemies } = useEnemies(characterId);

  const [targetId, setTargetId] = useState<number>();

  if (character != null && character.fightId == null) {
    router.push(`/character/${character.id}`);
    toast({ title: "Character is not in a fight", status: "error" });
  }

  const toggleTarget = (characterId: number) => {
    if (targetId === characterId) {
      setTargetId(undefined);
    } else {
      setTargetId(characterId);
    }
  };

  if (character == null || enemies == null) return <LoadingPage />;

  return (
    <Center h="100vh" bgColor="teal.50">
      <Button
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
        top={8}
        left={8}
        position="absolute"
        onClick={() => router.push(`/character/${character.id}`)}
      >
        Back
      </Button>

      <HStack gap={32}>
        <PlayerCharacterCard character={character} targetId={targetId} />
        <Icon as={GiCrossedSwords} boxSize={32} color="teal" />
        <Stack>
          {enemies.map((e) => (
            <EnemyCharacterCard
              character={e}
              setAsTarget={toggleTarget}
              isTargeted={targetId === e.id}
              key={e.id}
            />
          ))}
        </Stack>
      </HStack>
    </Center>
  );
};

export default Fight;
