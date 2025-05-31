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
import { Attribute } from "../../queries/character";

type Props = {
  attribute: Attribute;
  currentValue?: number;
  minValue?: number;
  enableDecrement?: boolean;
  enableIncrement?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
};

const AttributeInput = ({
  attribute,
  currentValue = 0,
  minValue = 6,
  enableIncrement = true,
  onDecrement,
  onIncrement,
}: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({ step: 1 });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  // const {
  //   attributes,
  //   remainingAttributePoints,
  //   incrementAttribute,
  //   decrementAttribute,
  // } = useNewCharacterContext();

  return (
    <>
      <GridItem>
        {/* Capitalize first letter */}
        <Text>{attribute.charAt(0).toUpperCase() + attribute.slice(1)}</Text>
      </GridItem>
      <GridItem justifySelf="end">
        <HStack width="fit-content">
          <IconButton
            {...decrement}
            icon={<MinusIcon />}
            aria-label={`Decrement ${attribute}`}
            isDisabled={currentValue <= minValue}
            onClick={onDecrement}
          />

          <Input
            {...input}
            readOnly
            textAlign="center"
            width="14"
            tabIndex={-1}
            value={currentValue}
          />

          <IconButton
            {...increment}
            icon={<AddIcon />}
            aria-label={`Increment ${attribute}`}
            isDisabled={!enableIncrement}
            onClick={onIncrement}
          />
        </HStack>
      </GridItem>
    </>
  );
};

export default AttributeInput;
