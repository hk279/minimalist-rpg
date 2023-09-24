import { HStack } from "@chakra-ui/react";
import EquippedItems from "./EquippedItems";
import InventoryItems from "./InventoryItems";
import { Character } from "../../../queries/character";

const InventoryView = ({ character }: { character: Character }) => {
  return (
    <HStack justifyContent="center" alignItems="top">
      <EquippedItems character={character} />
      <InventoryItems character={character} />
    </HStack>
  );
};

export default InventoryView;
