import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { GiScreenImpact } from "react-icons/gi";

type Props = { damage: number };

const DamageLabel = ({ damage }: Props) => (
  <Tag colorScheme="blackAlpha">
    <TagLeftIcon as={GiScreenImpact} />
    <TagLabel>{damage}</TagLabel>
  </Tag>
);

export default DamageLabel;
