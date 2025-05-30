import {
  Tag,
  TagLeftIcon,
  TagLabel,
  TagProps,
  Tooltip,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = TagProps & {
  icon?: IconType;
  colorScheme?: string;
  value: number | string;
  tooltip?: string;
};

const SimpleLabel = ({
  icon,
  value,
  colorScheme = "blackAlpha",
  tooltip,
  ...rest
}: Props) => {
  const tag = (
    <Tag colorScheme={colorScheme} {...rest}>
      {icon != null && <TagLeftIcon as={icon} />}
      <TagLabel>{value}</TagLabel>
    </Tag>
  );

  return tooltip ? <Tooltip label={tooltip}>{tag}</Tooltip> : tag;
};

export default SimpleLabel;
