import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList } from "@chakra-ui/react";
import useFightContext from "../../../context/FightContext";
import { SkillMenuItem } from "./SkillMenuItem";

const SkillMenu = () => {
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
        {character.skillInstances.map(({ remainingCooldown, skill }) => (
          <SkillMenuItem
            key={skill.id}
            skill={skill}
            remainingCooldown={remainingCooldown}
            currentEnergy={character.currentEnergy}
            skillAction={skillAction}
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default SkillMenu;
