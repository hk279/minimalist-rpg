import { RepeatIcon } from "@chakra-ui/icons";
import {
  Stack,
  useRadioGroup,
  Image,
  Input,
  Heading,
  Container,
  Grid,
  GridItem,
  Text,
  HStack,
  IconButton,
  Divider,
  Box,
} from "@chakra-ui/react";
import AttributeInput from "./AttributeInput";
import RadioCard from "./RadioCard";
import useNewCharacterContext from "../../context/NewCharacterContext";
import { CharacterClass, characterClasses } from "../../queries/character";

const NewCharacterForm = () => {
  const {
    attributes,
    remainingAttributePoints,
    incrementAttribute,
    decrementAttribute,
    avatarUrl,
    randomizeAvatar,
    characterName,
    setCharacterName,
    setCharacterClass,
  } = useNewCharacterContext();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "class",
    defaultValue: "Warrior",
    onChange: (value: CharacterClass) => setCharacterClass(value),
  });

  const group = getRootProps();

  return (
    <Container py={4}>
      <Stack gap={4} alignItems="center">
        {/* Avatar */}
        <Box
          position="relative"
          border="2px"
          borderColor="gray.100"
          borderRadius="lg"
          boxSize="xs"
        >
          <Image src={avatarUrl} alt="avatar" />
          <IconButton
            icon={<RepeatIcon />}
            aria-label="Randomize avatar"
            position="absolute"
            bottom={4}
            right={4}
            onClick={() => randomizeAvatar()}
          />
        </Box>

        <Divider />

        {/* Class selection */}
        <HStack justifyContent="space-between" width="full" {...group}>
          {characterClasses.map((cc) => {
            const radio = getRadioProps({ value: cc });
            return (
              <RadioCard key={cc} {...radio}>
                {cc}
              </RadioCard>
            );
          })}
        </HStack>

        {/* Character name */}
        <Input
          isRequired
          maxLength={24}
          placeholder="Character name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />

        {/* Attributes */}
        <Grid gap={4} alignItems="center" width="70%" alignSelf="center">
          <AttributeInput
            attribute="strength"
            currentValue={attributes.strength}
            onDecrement={() => decrementAttribute("strength")}
            onIncrement={() => incrementAttribute("strength")}
            enableIncrement={remainingAttributePoints > 0}
          />
          <AttributeInput
            attribute="intelligence"
            currentValue={attributes.intelligence}
            onDecrement={() => decrementAttribute("intelligence")}
            onIncrement={() => incrementAttribute("intelligence")}
            enableIncrement={remainingAttributePoints > 0}
          />
          <AttributeInput
            attribute="stamina"
            currentValue={attributes.stamina}
            onDecrement={() => decrementAttribute("stamina")}
            onIncrement={() => incrementAttribute("stamina")}
            enableIncrement={remainingAttributePoints > 0}
          />
          <AttributeInput
            attribute="spirit"
            currentValue={attributes.spirit}
            onDecrement={() => decrementAttribute("spirit")}
            onIncrement={() => incrementAttribute("spirit")}
            enableIncrement={remainingAttributePoints > 0}
          />

          <GridItem gridColumn="2" justifySelf="end">
            <HStack gap={8} justifyContent="flex-end" width="fit-content">
              <Text>Points remaining:</Text>
              <Heading size="lg">{remainingAttributePoints}</Heading>
            </HStack>
          </GridItem>
        </Grid>
      </Stack>
    </Container>
  );
};

export default NewCharacterForm;
