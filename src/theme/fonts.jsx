import {Platform} from 'react-native';

const getFont = (key, size) => {
  let fontStyle = Fonts.IBMPlexSansBold(size);
  switch (key) {
    case 'B':
      fontStyle = Fonts.IBMPlexSansBold(size);
      break;
    case 'BI':
      fontStyle = Fonts.IBMPlexSansBoldItalic(size);
      break;
    case 'EL':
      fontStyle = Fonts.IBMPlexSansExtraLight(size);
      break;
    case 'ELI':
      fontStyle = Fonts.IBMPlexSansExtraLightItalic(size);
      break;
    case 'I':
      fontStyle = Fonts.IBMPlexSansItalic(size);
      break;
    case 'L':
      fontStyle = Fonts.IBMPlexSansLight(size);
      break;
    case 'LI':
      fontStyle = Fonts.IBMPlexSansLightItalic(size);
      break;
    case 'M':
      fontStyle = Fonts.IBMPlexSansMedium(size);
      break;
    case 'MI':
      fontStyle = Fonts.IBMPlexSansMediumItalic(size);
      break;
    case 'R':
      fontStyle = Fonts.IBMPlexSansRegular(size);
      break;
    case 'SB':
      fontStyle = Fonts.IBMPlexSansSemiBold(size);
      break;
    case 'SBI':
      fontStyle = Fonts.IBMPlexSansSemiBoldItalic(size);
      break;
    case 'T':
      fontStyle = Fonts.IBMPlexSansThin(size);
      break;
    case 'TI':
      fontStyle = Fonts.IBMPlexSansThinItalic(size);
      break;
  }
  return fontStyle;
};

export const getTextStyle = (
  font,
  size,
  color,
  opacity,
  lineHeight,
  letterSpacing,
) => ({
  ...getFont(font, size),
  color,
  opacity,
  lineHeight,
  letterSpacing,
});

const Fonts = {
  IBMPlexSansThinItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-ThinItalic',
      fontSize: s,
    };
  },
  IBMPlexSansThin: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-Thin',
      fontSize: s,
    };
  },
  IBMPlexSansSemiBoldItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-SemiBoldItalic',
      fontSize: s,
    };
  },
  IBMPlexSansSemiBold: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-SemiBold',
      fontSize: s,
    };
  },
  IBMPlexSansRegular: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans',
      fontSize: s,
    };
  },
  IBMPlexSansMediumItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-MediumItalic',
      fontSize: s,
    };
  },
  IBMPlexSansMedium: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-Medium',
      fontSize: s,
      ...Platform.select({
        android: {
          fontWeight: 'normal',
        },
        ios: {
          fontWeight: '500',
        },
      }),
    };
  },
  IBMPlexSansLightItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-LightItalic',
      fontSize: s,
    };
  },
  IBMPlexSansLight: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-Light',
      fontSize: s,
    };
  },
  IBMPlexSansItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-Italic',
      fontSize: s,
    };
  },
  IBMPlexSansExtraLightItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-ExtraLightItalic',
      fontSize: s,
    };
  },
  IBMPlexSansExtraLight: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-ExtraLight',
      fontSize: s,
    };
  },
  IBMPlexSansBold: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-Bold',
      fontSize: s,
    };
  },
  IBMPlexSansBoldItalic: (s = 12) => {
    return {
      fontFamily: 'IBMPlexSans-BoldItalic',
      fontSize: s,
    };
  },
};

export const fonts = {
  ...Fonts,
};
