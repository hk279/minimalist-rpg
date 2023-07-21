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
  Progress,
  Center,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { Character } from "../../../queries/character";
import useFightContext from "../../../context/FightContext";
import DamageLabel from "../../generic/DamageLabel";

type Props = {
  character: Character;
};

const EnemyCharacterCard = ({ character }: Props) => {
  const { toggleTarget, targetId } = useFightContext();

  return (
    <Card
      onClick={() => toggleTarget(character.id)}
      cursor="pointer"
      boxShadow={targetId === character.id ? "0px 0px 0px 4px #319795" : "base"}
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
        <Center>
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

            <Image
              src={character.avatar}
              fallbackSrc="/enemy_placeholder.png"
              alt="Character avatar"
              boxSize="2xs"
            />

            {character.weapon == null ? (
              <Text textAlign="center">No weapon</Text>
            ) : (
              <HStack justifyContent="center">
                <Text>{character.weapon.name}</Text>
                <DamageLabel value={character.weapon.damage} />
              </HStack>
            )}
          </Stack>
        </Center>
      </CardBody>
    </Card>
  );
};

export default EnemyCharacterCard;
