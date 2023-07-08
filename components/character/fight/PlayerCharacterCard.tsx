import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  Stack,
  Heading,
  HStack,
  Divider,
  CardBody,
  Icon,
  CardFooter,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Image,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { Character } from "../../../queries/character";
import { useWeaponAttack } from "../../../queries/fight";

type Props = {
  character: Character;
  targetId?: number;
};

const PlayerCharacterCard = ({ character, targetId }: Props) => {
  const { mutate: weaponAttack, isLoading } = useWeaponAttack();

  const attackWithWeapon = (targetId?: number) => {
    if (character?.fightId != null && targetId != null) {
      weaponAttack({
        fightId: character?.fightId,
        attackerId: character.id,
        targetId: targetId,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <Stack height={16} gap={1} alignItems="center">
          <Heading size="md">{character.name}</Heading>
          <HStack>
            <Text>
              Level {character.level} {character.class}
            </Text>
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

          <Image src={character.avatar} alt="Character avatar" boxSize="2xs" />
        </Stack>
      </CardBody>

      <CardFooter justifyContent="center">
        <ButtonGroup>
          <Button
            isDisabled={targetId == null}
            isLoading={isLoading}
            onClick={() => attackWithWeapon(targetId)}
          >
            Attack
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Skills
            </MenuButton>
            <MenuList w="400px">
              {character.skills.map((s) => (
                <MenuItem key={s.name} justifyContent="space-between">
                  <Text fontStyle="italic" color="gray.500" flex={2}>
                    {s.damageType}
                  </Text>
                  <Text flex={2}>{s.name}</Text>
                  <Text flex={1} fontWeight="bold">
                    {s.damage}
                  </Text>
                  <HStack flex={1}>
                    <Icon as={AiFillThunderbolt} color="blue.500" />
                    <Text fontWeight="bold" color="blue.500">
                      {/* Placeholder energy cost */}
                      25
                    </Text>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PlayerCharacterCard;
