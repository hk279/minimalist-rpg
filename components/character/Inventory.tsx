import {
  Card,
  Center,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  IconButton,
  Tbody,
  Td,
  Stack,
  HStack,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import {
  Character,
  EquippedArmorPiece,
  EquippedItem,
  EquippedWeapon,
  armorSlots,
  useCharacterInventory,
} from "../../queries/character";

const Inventory = ({ character }: { character: Character }) => {
  const { data: inventory } = useCharacterInventory(character.id);

  const getRarityColor = (item?: EquippedItem) => {
    if (item != null) {
      switch (item.rarity) {
        case "Common":
          return "gray.500";
        case "Uncommon":
          return "green.500";
        case "Rare":
          return "blue.500";
        case "Epic":
          return "purple.500";
        default:
          break;
      }
    }
  };

  // const getWeaponTooltip = (item: EquippedWeapon) => {
  //   return (
  //     <Grid>
  //       <GridItem></GridItem>
  //       <GridItem></GridItem>

  //       <GridItem></GridItem>
  //       <GridItem></GridItem>
  //     </Grid>
  //   );
  // };

  return (
    <Card width="fit-content" padding="12">
      <Center>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Slot</Th>
                <Th>Name</Th>
                <Th>Armor</Th>
                <Th>Resistance</Th>
              </Tr>
            </Thead>

            <Tbody>
              {armorSlots.map((s) => {
                const equippedItem = character.equippedArmorPieces.find(
                  (a) => a.slot === s
                );

                return (
                  <Tr key={s}>
                    <Td>{s}</Td>
                    <Td color={getRarityColor(equippedItem)} fontWeight="bold">
                      {equippedItem?.name ?? "-"}
                    </Td>
                    <Td>{equippedItem?.armor ?? "-"}</Td>
                    <Td>{equippedItem?.resistance ?? "-"}</Td>
                    <Td>
                      <IconButton
                        variant="ghost"
                        aria-label="Item actions"
                        icon={<AiOutlineMore size="24" />}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Card>
  );
};

export default Inventory;
