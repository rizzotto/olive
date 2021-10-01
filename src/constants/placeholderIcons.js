import option1 from '../assets/placeholderIcons/option1.svg';
import option2 from '../assets/placeholderIcons/option2.svg';
import option3 from '../assets/placeholderIcons/option3.svg';
import option4 from '../assets/placeholderIcons/option4.svg';

const pages = {
  0: option1,
  1: option2,
  2: option3,
  3: option4,
};

export default function getPlaceholder(id) {
  return pages[id % 4];
}
