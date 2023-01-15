import { Button, useDisclosure, Container, SimpleGrid } from "@chakra-ui/react";
import NewCharacterModal from "../components/pages/index/NewCharacterModal";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Container>
            <Button onClick={onOpen}>Open Modal</Button>
            <NewCharacterModal isOpen={isOpen} onClose={onClose} />

            <SimpleGrid>
                {/* Render character cards */}
            </SimpleGrid>
        </Container>
    );
};

export default Home;