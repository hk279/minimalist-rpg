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
import AssignAttributePointsForm from "./AssignAttributePointsForm";
import useAssignAttributePointsContext from "../../../context/AssignAttributePointsContext";
import { Attributes } from "../../../queries/character";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AssignAttributePointsModal = ({ isOpen, onClose }: Props) => {
  const {
    attributes,
    initialAttributes,
    saveAttributePoints,
    resetForm,
    isSubmitting,
  } = useAssignAttributePointsContext();

  const areAttributesUnchanged =
    attributes === null
      ? true
      : Object.keys(attributes).every(
          (key) =>
            attributes[key as keyof Attributes] ===
            initialAttributes[key as keyof Attributes]
        );

  const handleSubmitAttributePoints = () => {
    saveAttributePoints();
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          Assign Attribute Points
          <ModalCloseButton position="unset" />
        </ModalHeader>

        <Divider />

        <ModalBody>
          <AssignAttributePointsForm />
        </ModalBody>

        <Divider />

        <ModalFooter>
          <Button colorScheme="teal" variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isDisabled={areAttributesUnchanged}
            isLoading={isSubmitting}
            colorScheme="teal"
            onClick={() => handleSubmitAttributePoints()}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignAttributePointsModal;
