import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure, Container, Spinner, HStack, Card, Heading, Stack, Text, Box, Center } from "@chakra-ui/react";
import CharacterCard from "../components/pages/index/CharacterCard";
import NewCharacterModal from "../components/pages/index/NewCharacterModal";
import { NewCharacterProvider } from "../context/NewCharacterContext";
import { useCharacterData } from "../queries/character";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading } = useCharacterData();
    const characterCount = data?.length ?? 0;
    const maxCharacterCount = 3;

    if (isLoading || data == null) return <Spinner size='xl' />;

    return (
        <Container maxW='container.xl' p={8}>
            <HStack gap={16}>
                {data.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}

                {characterCount < maxCharacterCount &&
                    <Card p={4} onClick={onOpen} cursor="pointer" _hover={{ boxShadow: "xl" }}>
                        <Stack alignItems="center">
                            <Center boxSize="2xs">
                                <AddIcon w={16} h={16} />
                            </Center>
                            <Heading height={16} size="md">New Character</Heading>
                        </Stack>
                    </Card>}
            </HStack>

            <NewCharacterProvider>
                <NewCharacterModal isOpen={isOpen} onClose={onClose} />
            </NewCharacterProvider>
        </Container>
    );
};

export default Home;