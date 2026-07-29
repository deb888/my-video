import "./index.css";
import { MyComposition } from "./Composition";
import { DogHighFiveComp } from "./DogHighFive";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <DogHighFiveComp />
    </>
  );
};
