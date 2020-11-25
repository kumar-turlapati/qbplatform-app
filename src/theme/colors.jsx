const white = 'white';
const black = 'black';
const clear = 'transparent';
const sliderinactiveColor = 'rgba(0,0,0,0.5)';

const seperatorColor = 'rgba(0,0,0,0.2)';

const errorText = 'rgba(0,0,0,0.8)';

const red = '#C3111A';
const lightGary = '#C4C4C4';

const backgroundColor = 'rgba(196,196,196,0.1)';
const borderColor = 'rgba(0,0,0,0.1)';
const green = '#34C759'

const blackOpacity6 = "rgba(0,0,0,0.6)";
const blackOpacity2 = 'rgba(0,0,0,0.2)';
const blackOpacity8 = 'rgba(0,0,0,0.8)';
const blackOpacity3 = 'rgba(0,0,0,0.3)';
const blackOpacity1 = 'rgba(0,0,0,0.1)';

const snow = 'rgb(249,249,249)'
const whiteSnow = 'rgb(245,245,245)'
const payneGrey = '#3C3C43'
const payneGreyOpacity = 'rgba(60, 60, 67, 0.6)'

const TabBar = {
  TAB_BAR_ACTIVE_TINT_COLOR: black,
  TAB_BAR_INACTIVE_TINT_COLOR: sliderinactiveColor,
};

const Buttons = {
  BUTTON_BG: red,
  BUTTON_TEXT: white,
};

const Common = {
  BLACK: black,
  WHITE: white,
  RED: red,
  CLEAR: clear,
  DEFAULT_BACKGROUND_COLOR: white,
  INACTIVE_DOT_COLOR: sliderinactiveColor,
  HEADER_LEFT_TITLE_COLOR: black,
  BLACK_WITH_OPACITY: sliderinactiveColor,
  IN_STOCK_BACKGROUND_COLOR: '#4A4A4A',
  LIGHT_GRAY: lightGary,
  SEPERATOR_COLOR: seperatorColor,
  BACKGROUND_COLOR: backgroundColor,
  BORDER_COLOR: borderColor,
  GREEN: green,
  BLACK_WITH_OPACITY_6: blackOpacity6,
  BLACK_WITH_OPACITY_2: blackOpacity2,
  BLACK_WITH_OPACITY_8: blackOpacity8,
  SNOW: snow,
  TEXT_INPUT_BORDER_COLOR: 'rgba(74,74,74,0.2)',
  ERROR_TEXT_BACKGROUND_COLOR: errorText,
  WHITE_SNOW: whiteSnow,
  BLACK_WITH_OPACITY_3: blackOpacity3,
  BLACK_WITH_OPACITY_1: blackOpacity1,
  BLACK_RUSSIAN: '#1C1C1E',
  VIVID_BLUE: '#0081CE'
};

const Product = {
  PRODUCT_LIST_TEXT_COLOR: black,
  PRODUCT_LIST_SPECIAL_TEXT_COLOR: black,
  PRODUCT_LIST_ORIGINAL_TEXT_COLOR: sliderinactiveColor,
  PRODUCT_LIST_DISCOUNT_TEXT_COLOR: red,
};

const OrderColor = {
  PAYNE_GREY: payneGrey,
  PAYNE_GREY_OPACITY: payneGreyOpacity
}

const Carousel = {
  ACTIVE_CAROUSEL_COLOR: '#4A4A4A',
  IN_ACTIVE_CAROUSEL_COLOR: 'rgba(196,196,196,0.6)',
};

const Slider = {
  SLIDER_THUMB_COLOR: black,
};

export const colors = {
  ...Buttons,
  ...Common,
  ...TabBar,
  ...Product,
  ...Slider,
  ...Carousel,
  ...OrderColor
};
