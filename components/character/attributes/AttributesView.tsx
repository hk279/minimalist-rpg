import {
  Card,
  Center,
  Divider,
  Grid,
  HStack,
  Icon,
  Image,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import AttributeRow from "./AttributeRow";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";

const AttributesView = ({ character }: { character: Character }) => {
  const getExperienceProgress = () => {
    const {
      currentLevelExperienceGained,
      nextLevelExperienceThreshold,
      level,
    } = character;

    return level == 50
      ? 100
      : (currentLevelExperienceGained / nextLevelExperienceThreshold) * 100;
  };

  return (
    <Card width="fit-content" padding="12">
      <Center>
        <Stack gap={8}>
          <Stack>
            <HStack>
              <Icon as={AiFillHeart} color="red.500" />
              <Progress
                value={
                  (character.currentHitPoints / character.maxHitPoints) * 100
                }
                textAlign="left"
                colorScheme="red"
                borderRadius="base"
                flex={1}
              />
              <Text fontWeight="bold" color="red.500">
                {character.currentHitPoints} / {character.maxHitPoints}
              </Text>
            </HStack>
            <HStack>
              <Icon as={AiFillThunderbolt} color="blue.500" />
              <Progress
                value={(character.currentEnergy / character.maxEnergy) * 100}
                textAlign="left"
                colorScheme="blue"
                borderRadius="base"
                flex={1}
              />
              <Text fontWeight="bold" color="blue.500">
                {character.currentEnergy} / {character.maxEnergy}
              </Text>
            </HStack>
          </Stack>

          <Divider />

          <HStack spacing={4} backgroundColor="white">
            <Image
              boxSize="2xs"
              src={character.avatar}
              alt="Character avatar"
            />

            <Stack spacing={8}>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <AttributeRow attribute="strength" character={character} />
                <AttributeRow attribute="intelligence" character={character} />
                <AttributeRow attribute="stamina" character={character} />
                <AttributeRow attribute="spirit" character={character} />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <AttributeRow attribute="armor" character={character} />
                <AttributeRow attribute="resistance" character={character} />
              </Grid>
            </Stack>
          </HStack>

          <Divider />

          <HStack gap={4}>
            <Text>Level {character.level}</Text>
            <Progress
              value={getExperienceProgress()}
              textAlign="left"
              colorScheme="teal"
              borderRadius="base"
              flex={1}
            />
            <Text>Level {character.level + 1}</Text>
          </HStack>
        </Stack>
      </Center>
    </Card>
  );
};

export default AttributesView;
