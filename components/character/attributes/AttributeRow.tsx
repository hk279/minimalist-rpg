import { GridItem, Text } from "@chakra-ui/react";
import { Attribute, SecondaryAttribute } from "../../types";
import { Character } from "../../queries/character";

type Props = {
  attribute: Attribute | SecondaryAttribute;
  character: Character;
};

const AttributeRow = ({ attribute, character }: Props) => {
  return (
    <>
      <GridItem>
        <Text align="left">
          {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
        </Text>
      </GridItem>
      <GridItem as="b">{character[attribute]}</GridItem>
    </>
  );
};

export default AttributeRow;
