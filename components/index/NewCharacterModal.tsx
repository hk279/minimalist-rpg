import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useNewCharacterContext from "../../context/NewCharacterContext";
import NewCharacterForm from "./NewCharacterForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NewCharacterModal = ({ isOpen, onClose }: Props) => {
  const {
    createNewCharacter,
    isCreatingCharacter,
    characterName,
    resetForm,
    remainingAttributePoints,
  } = useNewCharacterContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        {/* Modified header into a re-usable component if more modals are used */}
        <ModalHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          New Character
          <ModalCloseButton position="unset" />
        </ModalHeader>

        <Divider />

        <ModalBody>
          <NewCharacterForm />
        </ModalBody>

        <Divider />

        <ModalFooter>
          <Button colorScheme="teal" variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isDisabled={
              characterName.length < 3 || remainingAttributePoints < 0
            }
            isLoading={isCreatingCharacter}
            colorScheme="teal"
            onClick={() => {
              createNewCharacter();
              resetForm();
              onClose();
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewCharacterModal;
