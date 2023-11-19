import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { GiScreenImpact } from "react-icons/gi";

type Props = { value: number | string };

const DamageLabel = ({ value }: Props) => (
  <Tag colorScheme="blackAlpha">
    <TagLeftIcon as={GiScreenImpact} />
    <TagLabel>{value}</TagLabel>
  </Tag>
);

export default DamageLabel;
