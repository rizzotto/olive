import Streawberry from '../assets/userIcons/001-strawberry.svg';
import Water from '../assets/userIcons/002-mineral_water.svg';
import Coconut from '../assets/userIcons/003-coconut_drink.svg';
import Steak from '../assets/userIcons/004-steak.svg';
import Doughnut from '../assets/userIcons/005-doughnut.svg';
import IceCream from '../assets/userIcons/006-ice_cream.svg';
import Grapes from '../assets/userIcons/007-grapes.svg';
import Cocktail from '../assets/userIcons/008-cocktail.svg';
import Apple from '../assets/userIcons/009-apple.svg';
import AvocadoJuice from '../assets/userIcons/010-avocado.svg';
import Hamburger from '../assets/userIcons/011-hamburger.svg';
import BeerCan from '../assets/userIcons/012-beer_can.svg';
import Cherries from '../assets/userIcons/013-cherries.svg';
import Ice from '../assets/userIcons/014-ice.svg';
import Beef from '../assets/userIcons/015-beef.svg';
import Pear from '../assets/userIcons/016-pear.svg';
import OrangeJuice from '../assets/userIcons/017-orange_juice.svg';
import Kiwi from '../assets/userIcons/018-kiwi.svg';
import Pancake from '../assets/userIcons/019-pancake.svg';
import Red from '../assets/userIcons/020-red.svg';
import Mojito from '../assets/userIcons/021-mojito.svg';
import Lemon from '../assets/userIcons/022-lemon.svg';
import Popsicle from '../assets/userIcons/023-popsicle.svg';
import Watermelon from '../assets/userIcons/024-watermelon.svg';
import Avocado from '../assets/userIcons/025-avocado.svg';
import Tomato from '../assets/userIcons/026-tomato.svg';
import Healthy from '../assets/userIcons/027-healthy.svg';
import Apricot from '../assets/userIcons/028-apricot.svg';
import SoftDrink from '../assets/userIcons/029-soft_drink.svg';
import Popsicle2 from '../assets/userIcons/030-popsicle.svg';
import Pizza from '../assets/userIcons/031-pizza_slice.svg';
import Soda from '../assets/userIcons/032-soda.svg';
import Snack from '../assets/userIcons/033-snack.svg';
import Martini from '../assets/userIcons/034-martini.svg';
import Shrimp from '../assets/userIcons/035-shrimp.svg';
import CoffeCup from '../assets/userIcons/036-coffee_cup.svg';
import OrangeSoda from '../assets/userIcons/037-orange.svg';
import DragonFruit from '../assets/userIcons/038-dragon_fruit.svg';
import Meat from '../assets/userIcons/039-meat.svg';
import Candy from '../assets/userIcons/040-candy.svg';
import LimeJuice from '../assets/userIcons/041-lime_juice.svg';
import Cocktail2 from '../assets/userIcons/042-cocktail.svg';
import Pineapple from '../assets/userIcons/043-pineapple.svg';
import SodaCan from '../assets/userIcons/044-soda can.svg';
import Rainbow from '../assets/userIcons/045-rainbow.svg';
import PopsicleStick from '../assets/userIcons/046-popsicle_stick.svg';
import Pint from '../assets/userIcons/047-pint_of_beer.svg';
import WhiteWine from '../assets/userIcons/048-white_wine.svg';
import Orange from '../assets/userIcons/049-orange_juice.svg';
import IcedTea from '../assets/userIcons/050-iced_tea.svg';

const icons = {
  1: Pizza,
  2: IcedTea,
  3: Orange,
  4: Streawberry,
  5: Water,
  6: Coconut,
  7: Steak,
  8: Doughnut,
  9: IceCream,
  10: Grapes,
  11: Cocktail,
  12: Apple,
  13: AvocadoJuice,
  14: Hamburger,
  15: BeerCan,
  16: Cherries,
  17: Ice,
  18: Beef,
  19: Pear,
  20: OrangeJuice,
  21: Kiwi,
  22: Pancake,
  23: Red,
  24: Mojito,
  25: Lemon,
  26: Popsicle,
  27: Watermelon,
  28: Avocado,
  29: Tomato,
  30: Healthy,
  31: Apricot,
  32: SoftDrink,
  33: Popsicle2,
  34: Soda,
  35: Snack,
  36: Martini,
  37: Shrimp,
  38: CoffeCup,
  39: OrangeSoda,
  40: DragonFruit,
  41: Meat,
  42: Candy,
  43: LimeJuice,
  44: Cocktail2,
  45: Pineapple,
  46: SodaCan,
  47: Rainbow,
  48: PopsicleStick,
  49: Pint,
  50: WhiteWine,
};

export default function getIcon(iconNumber) {
  return icons[iconNumber];
}
