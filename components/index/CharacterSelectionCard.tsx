import { Card, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { CharacterListing } from "../../queries/character";
import Link from "next/link";

const CharacterSelectionCard = ({
  character,
}: {
  character: CharacterListing;
}) => {
  return (
    <Link href={`/character/${character.id}`}>
      <Card p={4} cursor="pointer" _hover={{ boxShadow: "xl" }}>
        <Stack alignItems="center">
          <Image boxSize="2xs" src={character.avatar} alt="Character avatar" />
          <Stack height={16} gap={1} alignItems="center">
            <Heading size="md">{character.name}</Heading>
            <HStack>
              <Text>Level 1 {character.class}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
};

export default CharacterSelectionCard;
