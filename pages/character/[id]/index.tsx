import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCharacter } from "../../../queries/character";
import { useRouter } from "next/router";
import AttributesView from "../../../components/character/attributes/AttributesView";
import LoadingPage from "../../../components/generic/LoadingPage";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import SkillsView from "../../../components/character/skills/SkillsView";
import { useStartFight } from "../../../queries/fight";
import InventoryView from "../../../components/character/inventory/InventoryView";
import { useCharacterId } from "../../../hooks/useCharacterId";
import { AssignAttributePointsProvider } from "../../../context/AssignAttributePointsContext";
import AssignAttributePointsModal from "../../../components/character/attributes/AssignAttributePointsModal";

const CharacterView = () => {
  const router = useRouter();
  const characterId = useCharacterId();
  const { data: character, isLoading } = useCharacter(characterId);
  const { mutateAsync: startFightAsync, isLoading: isStartingFight } =
    useStartFight(characterId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const startFight = async () => {
    await startFightAsync();
  };

  if (isLoading || character == null) return <LoadingPage />;

  return (
    <Box padding="4" h="100vh" w="100%" bgColor="teal.50">
      <Button
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
        top={8}
        left={8}
        position="absolute"
        onClick={() => router.push("/")}
      >
        Back
      </Button>

      <Stack spacing="4">
        <Stack
          divider={<StackDivider borderColor="gray.200" />}
          width="fit-content"
          margin="auto"
          textAlign="center"
        >
          <Heading as="span">{character.name}</Heading>
          <Text>
            Level {character.level} {character.class}
          </Text>
        </Stack>

        <Tabs align="center" colorScheme="teal" size="lg">
          <TabList>
            <Tab>Attributes</Tab>
            <Tab>Inventory</Tab>
            <Tab>Skills</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AttributesView character={character} />
            </TabPanel>
            <TabPanel>
              <InventoryView character={character} />
            </TabPanel>
            <TabPanel>
              <SkillsView character={character} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Center>
          <ButtonGroup spacing={8}>
            {character.fightId != null ? (
              <Button
                colorScheme="teal"
                onClick={() => router.push(`/character/${character.id}/fight`)}
              >
                Continue Battle
              </Button>
            ) : (
              <Button
                onClick={() => startFight()}
                isLoading={isStartingFight}
                colorScheme="teal"
              >
                To Battle
              </Button>
            )}
            {character.unassignedAttributePoints > 0 && (
              <Button colorScheme="teal" onClick={onOpen}>
                Assign Attribute Points ({character.unassignedAttributePoints})
              </Button>
            )}
          </ButtonGroup>
        </Center>
      </Stack>

      <AssignAttributePointsProvider>
        <AssignAttributePointsModal isOpen={isOpen} onClose={onClose} />
      </AssignAttributePointsProvider>
    </Box>
  );
};

export default CharacterView;
