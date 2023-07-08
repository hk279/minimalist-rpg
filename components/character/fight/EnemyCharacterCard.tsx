import {
  Card,
  CardHeader,
  Stack,
  Heading,
  HStack,
  Divider,
  CardBody,
  Icon,
  Text,
  Image,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { Character } from "../../../queries/character";
import { GetServerSidePropsContext } from "next";

type Props = {
  character: Character;
  setAsTarget: (characterId: number) => void;
  isTargeted: boolean;
};

const EnemyCharacterCard = ({ character, setAsTarget, isTargeted }: Props) => {
  return (
    <Card
      onClick={() => setAsTarget(character.id)}
      cursor="pointer"
      boxShadow={isTargeted ? "0px 0px 0px 4px #319795" : ""}
    >
      <CardHeader>
        <Stack height={16} gap={1} alignItems="center">
          <Heading size="md">{character.name}</Heading>
          <HStack>
            <Text>Level {character.level}</Text>
          </HStack>
        </Stack>

        <Divider />
      </CardHeader>

      <CardBody>
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

          <Image
            src={character.avatar}
            fallbackSrc="/enemy_placeholder.png"
            alt="Character avatar"
            boxSize="2xs"
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EnemyCharacterCard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
