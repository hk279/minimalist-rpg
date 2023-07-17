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
import { GiScreenImpact } from "react-icons/gi";
import useFightContext from "../../../context/FightContext";

type Props = {
  character: Character;
};

const EnemyCharacterCard = ({ character }: Props) => {
  const { toggleTarget, targetId } = useFightContext();

  return (
    <Card
      onClick={() => toggleTarget(character.id)}
      cursor="pointer"
      boxShadow={targetId === character.id ? "0px 0px 0px 4px #319795" : ""}
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
        <Stack alignItems="center">
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

          <HStack gap={8}>
            <Text>{character.weapon?.name ?? "No weapon"}</Text>
            <HStack>
              <Icon as={GiScreenImpact} />
              <Text fontWeight="bold">{character.weapon?.damage ?? 0}</Text>
            </HStack>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EnemyCharacterCard;
