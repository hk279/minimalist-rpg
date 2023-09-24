import { ItemRarity } from "../../../queries/character";

const useInventoryView = () => {
  const getRarityColor = (itemRarity: ItemRarity) => {
    switch (itemRarity) {
      case "Common":
        return "gray.500";
      case "Uncommon":
        return "green.500";
      case "Rare":
        return "blue.500";
      case "Epic":
        return "purple.500";
      default:
        break;
    }
  };

  return { getRarityColor };
};

export default useInventoryView;
