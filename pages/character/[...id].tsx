import {
  Center,
  HStack,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useCharacter } from "../../queries/character";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

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
    <Stack>
      <HStack divider={<StackDivider borderColor="gray.200" />}>
        <Heading>{character.name}</Heading>
        <Text>Level 1 {character.class}</Text>
      </HStack>
    </Stack>
  );
};

export default CharacterView;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
