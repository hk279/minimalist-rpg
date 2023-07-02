import { Card, Center, Grid, HStack, Image, Stack } from "@chakra-ui/react";
import { Character } from "../../queries/character";
import AttributeRow from "./AttributeRow";

const Attributes = ({ character }: { character: Character }) => {
  return (
    <Card width="fit-content" padding="12">
      <Center>
        <HStack spacing={4} backgroundColor="white">
          <Image boxSize="2xs" src={character.avatar} alt="Character avatar" />

          <Stack spacing={8}>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <AttributeRow attribute="strength" character={character} />
              <AttributeRow attribute="intelligence" character={character} />
              <AttributeRow attribute="stamina" character={character} />
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <AttributeRow attribute="armor" character={character} />
              <AttributeRow attribute="resistance" character={character} />
            </Grid>
          </Stack>
        </HStack>
      </Center>
    </Card>
  );
};

export default Attributes;
