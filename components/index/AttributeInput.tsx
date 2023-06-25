import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Input,
  useNumberInput,
  Text,
  GridItem,
} from "@chakra-ui/react";
import useNewCharacterContext from "../../context/NewCharacterContext";
import { Attribute } from "../../types";

type Props = {
  attribute: Attribute;
};

const AttributeInput = ({ attribute }: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const {
    attributes,
    remainingAttributePoints,
    incrementAttribute,
    decrementAttribute,
  } = useNewCharacterContext();

  return (
    <>
      <GridItem>
        {/* Capitalize first letter */}
        <Text>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</Text>
      </GridItem>
      <GridItem justifySelf="end">
        <HStack width="fit-content">
          <IconButton
            {...dec}
            icon={<MinusIcon />}
            aria-label={`Decrement ${attribute}`}
            disabled={attributes[attribute] < 2}
            onClick={() => decrementAttribute(attribute)}
          />

          <Input
            {...input}
            readOnly
            textAlign="center"
            width="14"
            tabIndex={-1}
            value={attributes[attribute]}
          />

          <IconButton
            {...inc}
            icon={<AddIcon />}
            aria-label={`Increment ${attribute}`}
            disabled={remainingAttributePoints < 1}
            onClick={() => incrementAttribute(attribute)}
          />
        </HStack>
      </GridItem>
    </>
  );
};

export default AttributeInput;
