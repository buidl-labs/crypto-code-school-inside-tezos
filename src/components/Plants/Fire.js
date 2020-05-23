//Fire Type Robot
import { PLANT_TYPES } from './PLANT_TYPES';

// Body
import Body1 from '../../assets/RobotTypes/Fire/Body_1.svg';
// Bottom
import Bottom1 from '../../assets/RobotTypes/Fire/Bottom_1.svg';
// Eyes
import Eye1 from '../../assets/RobotTypes/Fire/Eyes_1.svg';
import Eye2 from '../../assets/RobotTypes/Fire/Eyes_2.svg';
import Eye3 from '../../assets/RobotTypes/Fire/Eyes_3.svg';
import Eye4 from '../../assets/RobotTypes/Fire/Eyes_4.svg';
import Eye5 from '../../assets/RobotTypes/Fire/Eyes_5.svg';
import Eye6 from '../../assets/RobotTypes/Fire/Eyes_6.svg';
import Eye7 from '../../assets/RobotTypes/Fire/Eyes_7.svg';
import Eye8 from '../../assets/RobotTypes/Fire/Eyes_8.svg';
// Feet
import Feet1 from '../../assets/RobotTypes/Fire/Feet_1.svg';
import Feet2 from '../../assets/RobotTypes/Fire/Feet_2.svg';
import Feet3 from '../../assets/RobotTypes/Fire/Feet_3.svg';
import Feet4 from '../../assets/RobotTypes/Fire/Feet_4.svg';
import Feet5 from '../../assets/RobotTypes/Fire/Feet_5.svg';
// Gem and Gem Holder
import Gem from '../../assets/RobotTypes/Fire/Gem.svg';
import Gem_Holder from '../../assets/RobotTypes/Fire/Gem_Holder.svg';
// Left Hand/Back Hand
import RightHand1 from '../../assets/RobotTypes/Fire/Hand_Back_1.svg';
import RightHand2 from '../../assets/RobotTypes/Fire/Hand_Back_2.svg';
import RightHand3 from '../../assets/RobotTypes/Fire/Hand_Back_3.svg';
import RightHand4 from '../../assets/RobotTypes/Fire/Hand_Back_4.svg';
import RightHand5 from '../../assets/RobotTypes/Fire/Hand_Back_5.svg';
// Right Hand/Rest Hand
import LeftHand1 from '../../assets/RobotTypes/Fire/Hand_Rest_1.svg';
import LeftHand2 from '../../assets/RobotTypes/Fire/Hand_Rest_2.svg';
import LeftHand3 from '../../assets/RobotTypes/Fire/Hand_Rest_3.svg';
import LeftHand4 from '../../assets/RobotTypes/Fire/Hand_Rest_4.svg';
import LeftHand5 from '../../assets/RobotTypes/Fire/Hand_Rest_5.svg';
// Head
import Head1 from '../../assets/RobotTypes/Fire/Head_1.svg';
import Head2 from '../../assets/RobotTypes/Fire/Head_2.svg';
import Head3 from '../../assets/RobotTypes/Fire/Head_3.svg';
import Head4 from '../../assets/RobotTypes/Fire/Head_4.svg';
import Head5 from '../../assets/RobotTypes/Fire/Head_5.svg';
// Top
import Top1 from '../../assets/RobotTypes/Fire/Top_1.svg';
import Top2 from '../../assets/RobotTypes/Fire/Top_2.svg';
import Top3 from '../../assets/RobotTypes/Fire/Top_3.svg';
import Top4 from '../../assets/RobotTypes/Fire/Top_4.svg';
import Top5 from '../../assets/RobotTypes/Fire/Top_5.svg';

//Fire Gem
import fireGem from '../../assets/gems/fire.svg';

export default {
  type: PLANT_TYPES.FIRE,
  lowerBody: [Body1],
  lowerBottom: [Bottom1],
  eye: [Eye1, Eye2, Eye3, Eye4, Eye5, Eye6, Eye7, Eye8],
  feet: [Feet1, Feet2, Feet3, Feet4, Feet5],
  gem: [Gem],
  gemHolder: [Gem_Holder],
  rightHand: [RightHand1, RightHand2, RightHand3, RightHand4, RightHand5],
  leftHand: [LeftHand1, LeftHand2, LeftHand3, LeftHand4, LeftHand5],
  head: [Head1, Head2, Head3, Head4, Head5],
  top: [Top1, Top2, Top3, Top4, Top5],
  gemSeed: [fireGem],
};
