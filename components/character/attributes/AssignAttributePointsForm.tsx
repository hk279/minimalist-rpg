import {
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import useAssignAttributePointsContext from "../../../context/AssignAttributePointsContext";
import AttributeInput from "../../index/AttributeInput";

const AssignAttributePointsForm = () => {
  const {
    attributes,
    initialAttributes,
    unassignedAttributePoints,
    incrementAttribute,
    decrementAttribute,
  } = useAssignAttributePointsContext();

  return (
    <Container py={4}>
      <Grid gap={4} alignItems="center" width="70%" alignSelf="center">
        <AttributeInput
          attribute="strength"
          currentValue={attributes.strength}
          minValue={initialAttributes.strength}
          onIncrement={() => incrementAttribute("strength")}
          onDecrement={() => decrementAttribute("strength")}
          enableIncrement={unassignedAttributePoints > 0}
        />
        <AttributeInput
          attribute="intelligence"
          currentValue={attributes.intelligence}
          minValue={initialAttributes.intelligence}
          onIncrement={() => incrementAttribute("intelligence")}
          onDecrement={() => decrementAttribute("intelligence")}
          enableIncrement={unassignedAttributePoints > 0}
        />
        <AttributeInput
          attribute="stamina"
          currentValue={attributes.stamina}
          minValue={initialAttributes.stamina}
          onIncrement={() => incrementAttribute("stamina")}
          onDecrement={() => decrementAttribute("stamina")}
          enableIncrement={unassignedAttributePoints > 0}
        />
        <AttributeInput
          attribute="spirit"
          currentValue={attributes.spirit}
          minValue={initialAttributes.spirit}
          onIncrement={() => incrementAttribute("spirit")}
          onDecrement={() => decrementAttribute("spirit")}
          enableIncrement={unassignedAttributePoints > 0}
        />

        <GridItem gridColumn="2" justifySelf="end">
          <HStack gap={8} justifyContent="flex-end" width="fit-content">
            <Text>Points remaining:</Text>
            <Heading size="lg">{unassignedAttributePoints}</Heading>
          </HStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default AssignAttributePointsForm;
