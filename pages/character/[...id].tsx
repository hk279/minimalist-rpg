import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useCharacter } from "../../queries/character";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Attributes from "../../components/character/Attributes";
import Link from "next/link";

const CharacterView = () => {
  const router = useRouter();
  const { data: character, isLoading } = useCharacter(Number(router.query.id));

  if (isLoading || character == null) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box padding="4" height="100vh" width="100%" bgColor="teal.50">
      <Stack spacing="4">
        <Stack
          divider={<StackDivider borderColor="gray.200" />}
          width="fit-content"
          margin="auto"
          textAlign="center"
        >
          <Heading as="span">{character.name}</Heading>
          <Text>Level 1 {character.class}</Text>
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
              <p>Skills</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Center>
          <ButtonGroup spacing={8}>
            <Button colorScheme="teal">To Battle!</Button>
            <Button colorScheme="teal" variant="link">
              <Link href="/">Go Back</Link>
            </Button>
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
