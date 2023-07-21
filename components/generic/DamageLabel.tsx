import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { GiScreenImpact } from "react-icons/gi";

const DamageLabel = ({ value }: { value: number }) => (
  <Tag colorScheme="blackAlpha">
    <TagLeftIcon as={GiScreenImpact} />
    <TagLabel>{value}</TagLabel>
  </Tag>
);

export default DamageLabel;
