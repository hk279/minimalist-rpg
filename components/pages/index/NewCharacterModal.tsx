import { Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { NewCharacterProvider } from "../../../context/NewCharacterContext";
import NewCharacterForm from "./NewCharacterForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const NewCharacterModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                {/* Modified header into a re-usable component if more modals are used */}
                <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
                    New Character
                    <ModalCloseButton position="unset" />
                </ModalHeader>

                <Divider />

                <ModalBody>
                    <NewCharacterProvider>
                        <NewCharacterForm />
                    </NewCharacterProvider>
                </ModalBody>

                <Divider />

                <ModalFooter>
                    <Button colorScheme="teal" variant="ghost" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme="teal">Create</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NewCharacterModal;