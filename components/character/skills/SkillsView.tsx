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
} from "@chakra-ui/react";
import { Character } from "../../../queries/character";
import { GiHourglass, GiScreenImpact } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import DamageRangeLabel from "../../generic/DamageRangeLabel";
import EnergyCostLabel from "../../generic/EnergyCostLabel";
import CooldownLabel from "../../generic/CooldownLabel";

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
                <Th>
                  <Icon boxSize={4} as={GiScreenImpact} />
                </Th>
                <Th>
                  <Icon boxSize={4} color="blue.500" as={AiFillThunderbolt} />
                </Th>
                <Th>
                  <Icon boxSize={4} color="purple.500" as={GiHourglass} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {character.skillInstances.map(({ skill }) => (
                <Tr key={skill.id}>
                  <Td>{skill.damageType}</Td>
                  <Td>{skill.name}</Td>
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
