import RightArrowSVG from '../../assets/Iconset/arrow_right.svg';
import LeftArrowSVG from '../../assets/Iconset/arrow_left.svg';
import CheckSVG from '../../assets/Iconset/check.svg';
import CloseSVG from '../../assets/Iconset/close.svg';
import HintsSVG from '../../assets/Iconset/hints.svg';
import MenuSVG from '../../assets/Iconset/menu.svg';
import ShowAnswerSVG from '../../assets/Iconset/show_answer.svg';
import styled from '@emotion/styled';

export const RightArrow = styled(RightArrowSVG)`
  max-width: ${props => (props.small ? '20px' : '25px')};
  max-height: 25px;

  rect {
    height: 15px;
  }
`;

export const LeftArrow = styled(LeftArrowSVG)`
  max-width: ${props => (props.small ? '20px' : '25px')};
  max-height: 25px;

  rect {
    height: 15px;
  }
`;

export const Check = styled(CheckSVG)`
  max-width: 25px;
  max-height: 40px;

  rect {
    height: 15px;
  }
`;

export const Close = styled(CloseSVG)`
  max-width: 40px;
  max-height: 40px;

  rect {
    height: 15px;
  }
`;

export const Menu = styled(MenuSVG)`
  max-width: 40px;
  max-height: 40px;

  rect {
    height: 15px;
  }
`;

export const Hint = styled(HintsSVG)`
  max-width: 40px;
  max-height: 40px;

  rect {
    height: 15px;
  }
`;

export const ShowAnswer = styled(ShowAnswerSVG)`
  max-width: 25px;
  max-height: 40px;

  rect {
    height: 15px;
  }
`;
