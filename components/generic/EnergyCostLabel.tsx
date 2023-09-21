import { Tag, TagLeftIcon, TagLabel, TagProps } from "@chakra-ui/react";
import { AiFillThunderbolt } from "react-icons/ai";

type Props = TagProps & { energyCost: number; showIcon?: boolean };

const EnergyCostLabel = ({ energyCost, showIcon = true, ...rest }: Props) => (
  <Tag colorScheme="blue" {...rest}>
    {showIcon && <TagLeftIcon as={AiFillThunderbolt} color="blue.500" />}
    <TagLabel color="blue.500">{energyCost}</TagLabel>
  </Tag>
);

export default EnergyCostLabel;
