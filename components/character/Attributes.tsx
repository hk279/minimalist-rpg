import {
  Card,
  Center,
  Divider,
  Grid,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Character } from "../../queries/character";
import AttributeRow from "./AttributeRow";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";

const Attributes = ({ character }: { character: Character }) => {
  return (
    <Card width="fit-content" padding="12">
      <Center>
        <Stack>
          <HStack justifyContent="center" gap={8}>
            <HStack>
              <Icon as={AiFillHeart} color="red.500" />
              <Text fontWeight="bold" color="red.500">
                {character.currentHitPoints} / {character.maxHitPoints}
              </Text>
            </HStack>
            <HStack>
              <Icon as={AiFillThunderbolt} color="blue.500" />
              <Text fontWeight="bold" color="blue.500">
                {character.currentEnergy} / {character.maxEnergy}
              </Text>
            </HStack>
          </HStack>

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
        </Stack>
      </Center>
    </Card>
  );
};

export default Attributes;
