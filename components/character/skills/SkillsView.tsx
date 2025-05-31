import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Card,
  Center,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import { GiBroadsword, GiHourglass, GiScreenImpact } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import EnergyCostLabel from "../../generic/EnergyCostLabel";
import CooldownLabel from "./CooldownLabel";

const SkillsView = ({ character }: { character: Character }) => {
  return (
    <Card width="fit-content" padding="12">
      <Center>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Damage Type</Th>
                <Th>Name</Th>
                <Tooltip label="Weapon damage percentage">
                  <Th>
                    <Icon boxSize={4} as={GiBroadsword} />
                  </Th>
                </Tooltip>
                <Tooltip label="Damage range">
                  <Th>
                    <Icon boxSize={4} as={GiScreenImpact} />
                  </Th>
                </Tooltip>
                <Tooltip label="Energy cost">
                  <Th>
                    <Icon boxSize={4} color="blue.500" as={AiFillThunderbolt} />
                  </Th>
                </Tooltip>
                <Tooltip label="Cooldown">
                  <Th>
                    <Icon boxSize={4} color="purple.500" as={GiHourglass} />
                  </Th>
                </Tooltip>
              </Tr>
            </Thead>
            <Tbody>
              {character.skillInstances.map(({ skill }) => (
                <Tr key={skill.id}>
                  <Td>{skill.damageType}</Td>
                  <Td>{skill.name}</Td>
                  <Td>{skill.weaponDamagePercentage} %</Td>
                  <Td>
                    {skill.minBaseDamage !== 0 && skill.maxBaseDamage !== 0 && (
                      <DamageRangeLabel
                        minDamage={skill.minBaseDamage}
                        maxDamage={skill.maxBaseDamage}
                        showIcon={false}
                      />
                    )}
                  </Td>
                  <Td>
                    <EnergyCostLabel
                      energyCost={skill.energyCost}
                      showIcon={false}
                    />
                  </Td>
                  <Td>
                    <CooldownLabel cooldown={skill.cooldown} showIcon={false} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Card>
  );
};

export default SkillsView;
