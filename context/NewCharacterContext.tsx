import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  useCreateCharacter,
  Attribute,
  Attributes,
  CharacterClass,
} from "../queries/character";

interface NewCharacterContextInterface {
  characterName: string;
  setCharacterName: Dispatch<SetStateAction<string>>;
  characterClass: CharacterClass;
  setCharacterClass: Dispatch<SetStateAction<CharacterClass>>;
  attributes: Attributes;
  remainingAttributePoints: number;
  incrementAttribute: (attribute: Attribute) => void;
  decrementAttribute: (attribute: Attribute) => void;
  avatarUrl: string;
  randomizeAvatar: () => void;
  createNewCharacter: () => void;
  isCreatingCharacter: boolean;
  resetForm: () => void;
}

const avatarBaseUrl = "https://api.dicebear.com/5.x/adventurer/svg?seed=$";

export const NewCharacterContext =
  createContext<NewCharacterContextInterface | null>(null);

export const NewCharacterProvider = (props: { children: ReactNode }) => {
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] =
    useState<CharacterClass>("Warrior");
  const [attributes, setAttributes] = useState({
    strength: 5,
    intelligence: 5,
    stamina: 5,
    spirit: 5,
  });
  const [avatarUrl, setAvatarUrl] = useState(avatarBaseUrl + "2");

  const { mutate: createCharacter, isLoading: isCreatingCharacter } =
    useCreateCharacter();

  const remainingAttributePoints = useMemo(() => {
    const maxAttributePoints = 30;
    const spentAttributePoints = Object.values(attributes).reduce(
      (acc, curr) => acc + curr,
      0
    );
    return maxAttributePoints - spentAttributePoints;
  }, [attributes]);

  const incrementAttribute = (attribute: Attribute) => {
    setAttributes({ ...attributes, [attribute]: attributes[attribute] + 1 });
  };

  const decrementAttribute = (attribute: Attribute) => {
    setAttributes({ ...attributes, [attribute]: attributes[attribute] - 1 });
  };

  const randomizeAvatar = () => {
    const avatarSeed = crypto.randomUUID();
    setAvatarUrl(avatarBaseUrl + avatarSeed);
  };

  const createNewCharacter = () => {
    createCharacter({
      name: characterName,
      avatar: avatarUrl,
      characterClass,
      ...attributes,
    });
  };

  const resetForm = () => {
    setAttributes({ strength: 5, intelligence: 5, stamina: 5, spirit: 5 });
    setAvatarUrl(avatarBaseUrl + "2");
    setCharacterName("");
    setCharacterClass("Warrior");
  };

  return (
    <NewCharacterContext.Provider
      value={{
        characterName,
        setCharacterName,
        characterClass,
        setCharacterClass,
        attributes,
        remainingAttributePoints,
        incrementAttribute,
        decrementAttribute,
        avatarUrl,
        randomizeAvatar,
        createNewCharacter,
        isCreatingCharacter,
        resetForm,
      }}
    >
      {props.children}
    </NewCharacterContext.Provider>
  );
};

const useNewCharacterContext = () => {
  const context = useContext(NewCharacterContext);

  if (context == null) throw new Error("Using context outside of its Provider");

  return context;
};

export default useNewCharacterContext;
