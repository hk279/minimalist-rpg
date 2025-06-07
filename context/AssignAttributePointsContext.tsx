import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  Attribute,
  Attributes,
  useAssignAttributePoints,
  useCharacter,
} from "../queries/character";
import { useCharacterId } from "../hooks/useCharacterId";

interface AssignAttributePointsContextInterface {
  unassignedAttributePoints: number;
  initialAttributes: Attributes;
  attributes: Attributes;
  incrementAttribute: (attribute: Attribute) => void;
  decrementAttribute: (attribute: Attribute) => void;
  saveAttributePoints: () => void;
  isSubmitting: boolean;
  resetForm: () => void;
}

export const AssignAttributePointsContext =
  createContext<AssignAttributePointsContextInterface | null>(null);

export const AssignAttributePointsProvider = (props: {
  children: ReactNode;
}) => {
  const characterId = useCharacterId();
  const { data: character, isLoading: isCharacterLoading } =
    useCharacter(characterId);

  const initialAttributes = useMemo(
    () => ({
      strength: character?.strength ?? 0,
      intelligence: character?.intelligence ?? 0,
      stamina: character?.stamina ?? 0,
      spirit: character?.spirit ?? 0,
    }),
    [character]
  );

  const [attributes, setAttributes] = useState(initialAttributes);
  const [unassignedAttributePoints, setUnassignedAttributePoints] = useState(0);

  useEffect(() => {
    setUnassignedAttributePoints(character?.unassignedAttributePoints ?? 0);
  }, [character]);

  const { mutate: assignAttributePoints, isLoading: isSubmitting } =
    useAssignAttributePoints();

  const incrementAttribute = (attribute: Attribute) => {
    if (unassignedAttributePoints <= 0) return;

    setAttributes({ ...attributes, [attribute]: attributes[attribute] + 1 });
    setUnassignedAttributePoints(unassignedAttributePoints - 1);
  };

  const decrementAttribute = (attribute: Attribute) => {
    if (
      isCharacterLoading ||
      character == null ||
      attributes[attribute] <= character[attribute]
    ) {
      return;
    }

    setAttributes({ ...attributes, [attribute]: attributes[attribute] - 1 });
    setUnassignedAttributePoints(unassignedAttributePoints + 1);
  };

  const saveAttributePoints = () => {
    if (isCharacterLoading || character == null) return;

    assignAttributePoints({
      characterId: character.id,
      strength: attributes.strength - character.strength,
      intelligence: attributes.intelligence - character.intelligence,
      stamina: attributes.stamina - character.stamina,
      spirit: attributes.spirit - character.spirit,
    });
  };

  const resetForm = () => setAttributes(initialAttributes);

  return (
    <AssignAttributePointsContext.Provider
      value={{
        unassignedAttributePoints,
        initialAttributes,
        attributes,
        incrementAttribute,
        decrementAttribute,
        saveAttributePoints,
        isSubmitting,
        resetForm,
      }}
    >
      {props.children}
    </AssignAttributePointsContext.Provider>
  );
};

const useAssignAttributePointsContext = () => {
  const context = useContext(AssignAttributePointsContext);

  if (context == null) throw new Error("Using context outside of its Provider");

  return context;
};

export default useAssignAttributePointsContext;
