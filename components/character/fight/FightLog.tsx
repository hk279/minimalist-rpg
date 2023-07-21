import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Icon,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import useFightContext from "../../../context/FightContext";
import { Action } from "../../../queries/fight";
import { GiScreenImpact } from "react-icons/gi";
import { Fragment } from "react";
import DamageLabel from "../../generic/DamageLabel";

const FightLog = () => {
  const { turnEvents } = useFightContext();

  const getActionEntry = (action?: Action) => {
    if (action == null) return "";

    const {
      actionType,
      characterName,
      targetCharacterName,
      skillName,
      damage,
    } = action;

    switch (actionType) {
      case "WeaponAttack":
        return (
          <Box>
            {getCharacterTag(characterName)}
            {" attacked "}
            {getCharacterTag(targetCharacterName)}
            {" for "}
            <DamageLabel value={damage} />
          </Box>
        );
      case "Skill":
        return (
          <Box>
            {getCharacterTag(characterName)}
            {" attacked "}
            {getCharacterTag(targetCharacterName)}
            {" with "}
            {getSkillTag(skillName ?? "")}
            {" for "}
            <DamageLabel value={damage} />
          </Box>
        );
      default:
        throw new Error("Invalid ActionType");
    }
  };

  const getCharacterTag = (characterName: string) => (
    <Tag colorScheme="teal">
      <TagLabel>{characterName}</TagLabel>
    </Tag>
  );

  const getSkillTag = (skillName: string) => (
    <Tag colorScheme="blue">
      <TagLabel>{skillName}</TagLabel>
    </Tag>
  );

  return (
    <Card>
      <CardHeader>
        <Text fontWeight="bold" textAlign="center">
          Event Log
        </Text>
      </CardHeader>
      <CardBody textAlign="center">
        <Stack>
          {getActionEntry(turnEvents?.playerAction)}
          <Divider />
          {turnEvents?.enemyActions.map((enemyAction, index) => (
            <Fragment key={index}>{getActionEntry(enemyAction)}</Fragment>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FightLog;
