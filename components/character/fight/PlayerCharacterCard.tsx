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
import useFightContext from "../../../context/FightContext";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import EnergyCostLabel from "../../generic/EnergyCostLabel";
import CooldownCounterLabel from "../../generic/CooldownCounterLabel";
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
            <MenuList w="700px">
              {character.skillInstances.map(({ skill }) => (
                <MenuItem
                  key={skill.name}
                  onClick={() => attackWithSkill(skill.id)}
                  isDisabled={
                    skill.targetType !== "Enemy" ||
                    skill.energyCost > character.currentEnergy ||
                    skill.remainingCooldown > 0
                  }
                  display="grid"
                  gridTemplateColumns="2fr 4fr 2fr 2fr 2fr 2fr"
                >
                  <Text fontStyle="italic" color="gray.500">
                    {skill.damageType}
                  </Text>

                  <Text>{skill.name}</Text>

                  <Box>
                    {skill.weaponDamagePercentage > 0 && (
                      <DamageLabel value={`${skill.weaponDamagePercentage}%`} />
                    )}
                  </Box>

                  <Box>
                    {skill.minBaseDamage !== 0 && skill.maxBaseDamage !== 0 && (
                      <DamageRangeLabel
                        minDamage={skill.minBaseDamage}
                        maxDamage={skill.maxBaseDamage}
                      />
                    )}
                  </Box>

                  <Box>
                    <EnergyCostLabel energyCost={skill.energyCost} />
                  </Box>

                  <Box>
                    <CooldownCounterLabel
                      cooldown={skill.cooldown}
                      remainingCooldown={skill.remainingCooldown}
                    />
                  </Box>
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
