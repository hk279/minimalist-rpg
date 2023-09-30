import {
  Card,
  CardHeader,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  IconButton,
  Td,
  Icon,
  CardFooter,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import { AiOutlineMore } from "react-icons/ai";
import useInventoryView from "./useInventoryView";
import { GiBarbute, GiSwordBrandish } from "react-icons/gi";
import { useMemo } from "react";
import { useCharacterInventory, Item } from "../../../queries/inventory";

const InventoryItems = ({ character }: { character: Character }) => {
  const { useGetInventory, useEquipItem } = useCharacterInventory(character.id);
  const { data: inventory, isLoading: inventoryLoading } = useGetInventory();
  const { mutateAsync: equipItem, isLoading: isEquippingItem } = useEquipItem();

  const totalWeight = useMemo(
    () => inventory?.reduce((acc, curr) => (acc = acc + curr.weight), 0),
    [inventory]
  );

  return (
    <Card width="fit-content" padding="24px" align="center">
      <CardHeader>
        <Heading size="md">Inventory Items</Heading>
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
            {inventory
              ?.filter((item) => !item.isEquipped)
              .map((item) => (
                <InventoryItemRow
                  key={item.id}
                  item={item}
                  equipItem={() => equipItem(item.id)}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      <CardFooter>
        <Heading size="sm">
          Weight: {totalWeight} / {character.inventorySize}
        </Heading>
      </CardFooter>
    </Card>
  );
};

type InventoryItemRowProps = {
  item: Item;
  equipItem: () => void;
};

const InventoryItemRow = ({ item, equipItem }: InventoryItemRowProps) => {
  const { getRarityColor } = useInventoryView();

  return (
    <Tr>
      <Td>
        {item.type === "Weapon" ? (
          <Icon as={GiSwordBrandish} boxSize="8" />
        ) : (
          <Icon as={GiBarbute} boxSize="8" />
        )}
      </Td>
      <Td
        color={item.rarity != null ? getRarityColor(item.rarity) : ""}
        fontWeight="bold"
      >
        {item.name}
      </Td>
      <Td>
        {/* <IconButton
          variant="ghost"
          aria-label="Item actions"
          icon={<AiOutlineMore size="24" />}
        /> */}

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<AiOutlineMore size="24" />}
            variant="ghost"
            aria-label="Item actions"
          />
          <MenuList>
            <MenuItem onClick={equipItem}>Equip</MenuItem>
            <MenuItem isDisabled={true}>Discard</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default InventoryItems;
