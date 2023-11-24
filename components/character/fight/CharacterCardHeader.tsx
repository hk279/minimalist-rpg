import {
  Text,
  CardHeader,
  Stack,
  Heading,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Character } from "../../../queries/character";

const CharacterCardHeader = ({ character }: { character: Character }) => {
  return (
    <CardHeader paddingBottom={0}>
      <Stack height={16} gap={1} alignItems="center">
        <Heading size="md">{character.name}</Heading>
        <HStack>
          <Text>
            Level {character.level} {character.class}
          </Text>
        </HStack>
      </Stack>

      <Divider />
    </CardHeader>
  );
};

export default CharacterCardHeader;
