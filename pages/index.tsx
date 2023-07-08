import { AddIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Spinner,
  HStack,
  Card,
  Heading,
  Stack,
  Center,
} from "@chakra-ui/react";
import CharacterSelectionCard from "../components/index/CharacterSelectionCard";
import NewCharacterModal from "../components/index/NewCharacterModal";
import { NewCharacterProvider } from "../context/NewCharacterContext";
import { useCharacterList } from "../queries/character";
import LoadingPage from "../components/generic/LoadingPage";

const MAX_CHARACTER_COUNT = 3;

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useCharacterList();
  const characterCount = data?.length ?? 0;

  if (isLoading || data == null) return <LoadingPage />;

  return (
    <Center h="100vh" p={8} bgColor="teal.50">
      <HStack gap={16} justifyContent="center">
        {data.map((character) => (
          <CharacterSelectionCard key={character.id} character={character} />
        ))}

        {characterCount < MAX_CHARACTER_COUNT && (
          <Card
            p={4}
            onClick={onOpen}
            cursor="pointer"
            _hover={{ boxShadow: "xl" }}
          >
            <Stack alignItems="center">
              <Center boxSize="2xs">
                <AddIcon w={16} h={16} />
              </Center>
              <Heading height={16} size="md">
                New Character
              </Heading>
            </Stack>
          </Card>
        )}
      </HStack>

      <NewCharacterProvider>
        <NewCharacterModal isOpen={isOpen} onClose={onClose} />
      </NewCharacterProvider>
    </Center>
  );
};

export default Home;
