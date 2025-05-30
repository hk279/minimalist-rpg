import { Text, Box, MenuItem } from "@chakra-ui/react";
import CooldownCounterLabel from "../../generic/CooldownCounterLabel";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import EnergyCostLabel from "../../generic/EnergyCostLabel";
import SimpleLabel from "../../generic/SimpleLabel";
import { GiBroadsword } from "react-icons/gi";

type Props = {
  skill: any;
  remainingCooldown: number;
  currentEnergy: number;
  skillAction: (id: number) => void;
};

export const SkillMenuItem = ({
  skill,
  remainingCooldown,
  currentEnergy,
  skillAction,
}: Props) => (
  <MenuItem
    key={skill.name}
    onClick={() => skillAction(skill.id)}
    isDisabled={
      skill.targetType !== "Enemy" ||
      skill.energyCost > currentEnergy ||
      remainingCooldown > 0
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
        <SimpleLabel
          icon={GiBroadsword}
          value={`${skill.weaponDamagePercentage} %`}
          tooltip="Percentage of weapon damage"
        />
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
        remainingCooldown={remainingCooldown}
      />
    </Box>
  </MenuItem>
);
