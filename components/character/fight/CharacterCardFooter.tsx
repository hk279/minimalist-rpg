import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  CardFooter,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import SkillMenu from "./SkillMenu";
import useFightContext from "../../../context/FightContext";

const CharacterCardFooter = () => {
  const { targetId, isLoading, attackAction } = useFightContext();

  return (
    <CardFooter justifyContent="center">
      <ButtonGroup>
        <Button
          isDisabled={targetId == null}
          isLoading={isLoading}
          onClick={attackAction}
        >
          Attack
        </Button>

        <SkillMenu />

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
  );
};

export default CharacterCardFooter;
