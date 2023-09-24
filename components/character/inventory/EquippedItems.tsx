import {
  Card,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  CardHeader,
  Heading,
  IconButton,
  Td,
} from "@chakra-ui/react";
import { Character, ItemRarity, armorSlots } from "../../../queries/character";
import { AiOutlineMore } from "react-icons/ai";
import useInventoryView from "./useInventoryView";

const Inventory = ({ character }: { character: Character }) => {
  return (
    <Card width="fit-content" padding="24px" align="center">
      <CardHeader>
        <Heading size="md">Equipped Items</Heading>
      </CardHeader>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Slot</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            <EquippedItemRow
              slot="Weapon"
              name={character.equippedWeapon?.name ?? "-"}
              rarity={character.equippedWeapon?.rarity}
            />

            {armorSlots.map((s) => {
              const equippedItem = character.equippedArmorPieces.find(
                (a) => a.slot === s
              );

              return (
                <EquippedItemRow
                  key={s}
                  slot={s}
                  name={equippedItem?.name ?? "-"}
                  rarity={equippedItem?.rarity}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

const EquippedItemRow = ({
  slot,
  name,
  rarity,
}: {
  slot: string;
  name: string;
  rarity?: ItemRarity;
}) => {
  const { getRarityColor } = useInventoryView();

  return (
    <Tr>
      <Td>{slot}</Td>
      <Td
        color={rarity != null ? getRarityColor(rarity) : ""}
        fontWeight="bold"
      >
        {name}
      </Td>
      <Td>
        <IconButton
          variant="ghost"
          aria-label="Item actions"
          icon={<AiOutlineMore size="24" />}
        />
      </Td>
    </Tr>
  );
};

export default Inventory;
