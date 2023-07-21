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
  Progress,
  Center,
  Box,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { GiHourglass, GiScreenImpact } from "react-icons/gi";
import useFightContext from "../../../context/FightContext";
import DamageLabel from "../../generic/DamageLabel";

const PlayerCharacterCard = () => {
  const {
    character,
    targetId,
    isAttacking,
    attackWithWeapon,
    attackWithSkill,
  } = useFightContext();

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

      <CardFooter justifyContent="center">
        <ButtonGroup>
          <Button
            isDisabled={targetId == null}
            isLoading={isAttacking}
            onClick={() => attackWithWeapon()}
          >
            Attack
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              isLoading={isAttacking}
              isDisabled={targetId == null}
            >
              Skills
            </MenuButton>
            <MenuList w="500px">
              {character.skills.map((s) => (
                <MenuItem
                  key={s.name}
                  justifyContent="space-between"
                  onClick={() => attackWithSkill(s.id)}
                  isDisabled={
                    s.targetType !== "Enemy" ||
                    s.energyCost > character.currentEnergy ||
                    s.remainingCooldown > 0
                  }
                >
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
                      {s.remainingCooldown === 0
                        ? "Ready"
                        : `${s.remainingCooldown} / ${s.cooldown}`}
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
