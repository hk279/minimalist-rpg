import { FightProvider } from "../../../context/FightContext";
import FightView from "../../../components/character/fight/FightView";

const Fight = () => {
  return (
    <FightProvider>
      <FightView />
    </FightProvider>
  );
};

export default Fight;
