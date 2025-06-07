import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import {
  Text,
  HStack,
  Divider,
  Tag,
  TagLabel,
  CardBody,
  Center,
  Icon,
  Progress,
  Stack,
  Image,
} from "@chakra-ui/react";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import { Character } from "../../../queries/character";
import fallbackAvatar from "../../../public/enemy_placeholder_small.png";

type Props = {
  character: Character;
};

const MultiEnemyCharacterCardBody = ({ character }: Props) => {
  return (
    <CardBody gap={2} paddingTop={2}>
      <Center>
        <Stack>
          {character.statusEffectInstances.length > 0 ? (
            <>
              <HStack>
                {character.statusEffectInstances.map((si, index) => (
                  <Tag key={index}>
                    <TagLabel>{si.statusEffect.name}</TagLabel>
                  </Tag>
                ))}
              </HStack>
              <Divider />
            </>
          ) : null}

          <HStack justifyContent="center" gap={4}>
            <Image
              src={character.avatar}
              alt="Character avatar"
              fallbackSrc={fallbackAvatar.src}
            />

            <Stack flex={1} textAlign="center">
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
                  minW={120}
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
                  minW={120}
                />
                <Text fontWeight="bold" color="blue.500">
                  {character.currentEnergy} / {character.maxEnergy}
                </Text>
              </HStack>
            </Stack>
          </HStack>

          {character.equippedWeapon == null ? (
            <Text textAlign="center">No weapon</Text>
          ) : (
            <HStack justifyContent="center">
              <Text>{character.equippedWeapon.name}</Text>
              <DamageRangeLabel
                minDamage={character.equippedWeapon.minDamage}
                maxDamage={character.equippedWeapon.maxDamage}
              />
            </HStack>
          )}
        </Stack>
      </Center>
    </CardBody>
  );
};

export default MultiEnemyCharacterCardBody;
