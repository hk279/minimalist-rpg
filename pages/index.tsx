import { Button, useDisclosure, Container, SimpleGrid, Spinner, Box } from "@chakra-ui/react";
import NewCharacterModal from "../components/pages/index/NewCharacterModal";
import { NewCharacterProvider } from "../context/NewCharacterContext";
import { useCharacterData } from "../queries/character";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading } = useCharacterData();

    if (isLoading || data == null) return <Spinner size='xl' />;

    return (
        <Container>
            <Button onClick={onOpen}>Open Modal</Button>

            <NewCharacterProvider>
                <NewCharacterModal isOpen={isOpen} onClose={onClose} />
            </NewCharacterProvider>

            {/* Render character cards */}
            <SimpleGrid>
                {data.map(character => (
                    <Box key={character.id}>{character.name}</Box>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default Home;