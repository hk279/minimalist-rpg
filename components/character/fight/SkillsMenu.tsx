import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import CooldownCounterLabel from "../../generic/CooldownCounterLabel";
import DamageLabel from "../../generic/DamageLabel";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import EnergyCostLabel from "../../generic/EnergyCostLabel";
import useFightContext from "../../../context/FightContext";

const SkillsMenu = () => {
  const { isLoading, targetId, character, skillAction } = useFightContext();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        isLoading={isLoading}
        isDisabled={targetId == null}
      >
        Skills
      </MenuButton>
      <MenuList w="700px">
        {character.skillInstances.map(({ skill }) => (
          <MenuItem
            key={skill.name}
            onClick={() => skillAction(skill.id)}
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
  );
};

export default SkillsMenu;
