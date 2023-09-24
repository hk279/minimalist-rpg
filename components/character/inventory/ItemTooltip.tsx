import { Grid, GridItem } from "@chakra-ui/react";
import { Item } from "../../../queries/character";
import useInventoryView from "./useInventoryView";

const ItemTooltip = ({ item }: { item: Item }) => {
  const { getRarityColor } = useInventoryView();

  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem
        colSpan={2}
        color={getRarityColor(item.rarity)}
        fontWeight="bold"
      >
        {item.name}
      </GridItem>
      <ItemTooltipRow key="Type" value={item.type.toString()} />
      <ItemTooltipRow key="Level" value={item.level.toString()} />
      <ItemTooltipRow key="Weight" value={item.weight.toString()} />
      <ItemTooltipRow key="Value" value={item.value.toString()} />
    </Grid>
  );
};

const ItemTooltipRow = ({ key, value }: { key: string; value: string }) => {
  return (
    <>
      <GridItem fontWeight="bold">{key}</GridItem>
      <GridItem>{value}</GridItem>
    </>
  );
};

export default ItemTooltip;
