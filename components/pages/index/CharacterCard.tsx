import { Card, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Character } from "../../../queries/character";

const CharacterCard = ({ character }: { character: Character; }) => {
    return (
        <Card p={4} cursor="pointer" _hover={{ boxShadow: "xl" }}>
            <Stack alignItems="center">
                <Image boxSize="2xs" src={character.avatar} alt="Character avatar" />
                <Stack height={16} gap={1} alignItems="center">
                    <Heading size="md">{character.name}</Heading>
                    <HStack>
                        <Text>Level 1</Text>
                        <Text>{character.class}</Text>
                    </HStack>
                </Stack>
            </Stack>
        </Card>
    );
};

export default CharacterCard;