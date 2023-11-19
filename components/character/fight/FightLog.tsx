import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import useFightContext from "../../../context/FightContext";
import { ActionResponse } from "../../../queries/fight";
import { Fragment } from "react";
import DamageLabel from "../../generic/DamageLabel";

const FightLog = () => {
  const { turnEvents } = useFightContext();

  const getActionEntry = (action?: ActionResponse) => {
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
            <DamageLabel damage={damage} />
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
            <DamageLabel damage={damage} />
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
