import { Dimensions } from 'react-native';
import { colors } from './colors';

const { height, width } = Dimensions.get('window')

export const viewStyles = {
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND_COLOR,
  },
  restContainer: {
    flex: 1,
    backgroundColor: colors.WHITE_SNOW,
  },
  textInputStyles: {
    marginHorizontal: 35,
    height: 56,
    borderRadius: 5,
    borderColor: colors.TEXT_INPUT_BORDER_COLOR,
    borderWidth: 1.5,
    paddingLeft: 16,
    fontSize: 17,
    lineHeight: 22
  },
  headerTextStyles: {
    marginTop: 16,
    marginHorizontal: 35,
    color: colors.RED,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    marginBottom: 5
  },
  buttonStyles: {
    marginHorizontal: 35,
    marginTop: 16,
    borderRadius: 10,
    height: 50,
    backgroundColor: colors.RED
  },
  activityIndicatorStyles: {
    position: 'absolute',
    backgroundColor: colors.SEPERATOR_COLOR,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorTextStyles: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    marginTop: 25,
    color: colors.WHITE,
    backgroundColor: colors.RED,
    marginTop: 50,
  },
  textDashboardHeaderStyles: {
    marginTop: 54,
    height: 20,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.RED
  },
  headerDashboardStyles: {
    width: width,
    height: 88,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.BLACK_WITH_OPACITY_3,
  },
  separatorStyle: {
    backgroundColor: colors.BLACK,
    height: 1,
    marginHorizontal: 0,
    marginTop: 26,
    opacity: 0.1
  },
  listRowViewStyle: {
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.BLACK_WITH_OPACITY_3,
  },
  commonTextStyles: {
    paddingVertical: 11,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: colors.BLACK,
  },
  orderTitleStyles: {
    paddingVertical: 13,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: colors.PAYNE_GREY,
    opacity: 0.5,
  },
  viewCommonStyle: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: colors.BLACK_WITH_OPACITY_1,
    borderBottomWidth: 1,
  },
  descriptionStyles: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: colors.PAYNE_GREY_OPACITY,
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  viewMainStyles: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }
};
