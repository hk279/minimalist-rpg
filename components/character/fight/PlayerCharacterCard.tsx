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
import { GiHourglass, GiScreenImpact } from "react-icons/gi";
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

          <Image src={character.avatar} alt="Character avatar" boxSize="2xs" />

          <HStack gap={8}>
            <Text>{character.weapon?.name ?? "No weapon"}</Text>
            <HStack>
              <Icon as={GiScreenImpact} />
              <Text fontWeight="bold">{character.weapon?.damage ?? 0}</Text>
            </HStack>
          </HStack>
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
            <MenuList w="500px">
              {character.skills.map((s) => (
                <MenuItem key={s.name} justifyContent="space-between">
                  <Text fontStyle="italic" color="gray.500" flex={1}>
                    {s.damageType}
                  </Text>
                  <Text flex={3}>{s.name}</Text>
                  <HStack flex={1}>
                    <Icon as={GiScreenImpact} />
                    <Text fontWeight="bold">{s.damage}</Text>
                  </HStack>
                  <HStack flex={1}>
                    <Icon as={AiFillThunderbolt} color="blue.500" />
                    <Text fontWeight="bold" color="blue.500">
                      {s.energyCost}
                    </Text>
                  </HStack>
                  <HStack flex={1}>
                    <Icon as={GiHourglass} color="purple.500" />
                    <Text fontWeight="bold" color="purple.500">
                      {s.cooldown}
                    </Text>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              isDisabled={true}
            >
              Items
            </MenuButton>
          </Menu>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PlayerCharacterCard;
