import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, useNumberInput, Text, Box, GridItem } from "@chakra-ui/react";

type Props = {
    attribute: string;
};

const AttributeInput = ({ attribute }: Props) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 5,
            min: 1,
            max: 100
        });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <>
            <GridItem>
                <Text>{attribute}</Text>
            </GridItem>
            <GridItem justifySelf="end">
                <HStack width="fit-content">
                    <IconButton {...dec} icon={<MinusIcon />} aria-label="decrement"></IconButton>
                    <Input {...input} readOnly textAlign="center" width="14" tabIndex={-1} />
                    <IconButton {...inc} icon={<AddIcon />} aria-label="increment"></IconButton>
                </HStack>
            </GridItem>
        </>
    );
};

export default AttributeInput;