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
} from "@chakra-ui/react";
import { useCharacter } from "../../../queries/character";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Attributes from "../../../components/character/Attributes";
import LoadingPage from "../../../components/generic/LoadingPage";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Skills from "../../../components/character/Skills";
import { useStartFight } from "../../../queries/fight";

const CharacterView = () => {
  const router = useRouter();
  const characterId = Number(router.query.id);
  const { data: character, isLoading } = useCharacter(characterId);
  const { mutateAsync: startFightAsync, isLoading: isStartingFight } =
    useStartFight(characterId);

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
            {character.level} {character.class}
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
              <Attributes character={character} />
            </TabPanel>
            <TabPanel>
              <p>Inventory</p>
            </TabPanel>
            <TabPanel>
              <Skills character={character} />
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
          </ButtonGroup>
        </Center>
      </Stack>
    </Box>
  );
};

export default CharacterView;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
