import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import CommonHeader from './MarketingExecutive/UI/CommonHeader';
import {ScreenNamesMarketing} from './../helpers/ScreenNames';
import CommonSpinner from './MarketingExecutive/UI/CommonSpinner';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';

// const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)',
  },
  mainDescriptionStyle: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingTop: 6,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  productViewStyles: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  iconBackgroundStyle: {
    backgroundColor: '#5856D6',
    marginVertical: 10,
    borderRadius: 5,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listMainTitle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#000000',
    paddingLeft: 11,
    paddingTop: 9,
  },
  listDescriptionTitle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingLeft: 11,
    paddingTop: 0,
  },
  mainViewStyles: {
    backgroundColor: 'white',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  cameraStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export const PdfViewer = ({navigation, route}) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const pdfUrl = route.params.pdfUrl;
  console.log(pdfUrl, 'pdf url is....');
  const renderHeader = () => {
    return (
      <CommonHeader
        mainViewHeading={'PDF Viewer'}
        leftSideText={'Back'}
        rightSideText={'Share'}
        onPressRightButton={() => {
          let filePath = null;
          const configOptions = {fileCache: true};
          RNFetchBlob.config(configOptions)
            .fetch('GET', pdfUrl)
            .then(resp => {
              filePath = resp.path();
              return resp.readFile('base64');
            })
            .then(async base64Data => {
              base64Data = `data:application/pdf;base64,` + base64Data;
              await Share.open({url: base64Data});
              // remove the image or pdf from device's storage
              await RNFS.unlink(filePath);
            });
        }}
        onPressLeftButton={() => {
          navigation.navigate(ScreenNamesMarketing.ORDERSLIST);
        }}
      />
    );
  };

  const renderSpinner = () => {
    return <CommonSpinner animating={showSpinner} />;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Pdf
        source={{uri: pdfUrl}}
        onLoadComplete={() => {
          setShowSpinner(false);
        }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`current page: ${page}`);
        // }}
        onError={error => {
          setShowSpinner(false);
          console.log(error);
        }}
        // onPressLink={uri => {
        //   console.log(`Link presse: ${uri}`);
        // }}
        style={styles.pdf}
      />
      {renderSpinner()}
    </View>
  );
};
