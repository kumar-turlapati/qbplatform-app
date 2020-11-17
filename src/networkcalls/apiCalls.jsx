import Axios, {AxiosResponse, Canceler} from 'axios';
import {
  restEndPoints,
  requestHeaders,
  qbUrl,
  clientCode,
  requestHeadersWoOrg,
} from '../../qbconfig';

const {
  LOGIN,
  RESEND_OTP,
  GET_TOKEN,
  CATALOGS,
  PRODUCT_NAMES,
  CATALOG_DETAILS,
  CUSTOMER_NAMES,
  LIST_APPOINTMENTS,
  CATS_SUBCATS,
  DETAILS_BY_NAME,
  NEW_ORDER,
  ITEMS_DETAILS_BY_SCAN_BARCODE,
} = restEndPoints;

export const loginAPI = mobileNumber => {
  return Axios.post(
    LOGIN.URL,
    {
      mobileNo: mobileNumber,
      grantType: 'password',
      orgCode: clientCode,
    },
    {headers: requestHeadersWoOrg},
  );
};

export const getToken = (uuid, otp) => {
  return Axios.post(
    GET_TOKEN.URL,
    {
      uuid: uuid,
      otp: otp,
    },
    {headers: requestHeaders},
  );
};

export const resendOTP = uuid => {
  return Axios.post(
    RESEND_OTP.URL,
    {
      uuid: uuid,
    },
    {headers: requestHeaders},
  );
};

export const getProductSearch = async (accessToken, searchString) => {
  requestHeadersWoOrg['Access-Token'] = accessToken;
  return await Axios.get(PRODUCT_NAMES.URL(searchString), {
    headers: requestHeadersWoOrg,
  });
};

export const getCustomerName = async (accessToken, name) => {
  requestHeadersWoOrg['Access-Token'] = accessToken;
  return await Axios.get(CUSTOMER_NAMES.URL(name), {
    headers: requestHeadersWoOrg,
  });
};

export const getCatalogList = async accessToken => {
  requestHeadersWoOrg['Access-Token'] = accessToken;
  return await Axios.get(CATALOGS.URL, {
    headers: requestHeadersWoOrg,
  });
};

export const getCatalogDetails = async (accessToken, catalogCode) => {
  requestHeaders['Access-Token'] = accessToken;
  return await Axios.get(CATALOG_DETAILS.URL(catalogCode), {
    headers: requestHeaders,
  });
};

export const getAppointmentList = async (
  accessToken,
  pageNo,
  perPage,
  appointmentTime,
) => {
  console.log(
    'LIST_APPOINTMENTS.URL(pageNo, perPage, appointmentTime),',
    LIST_APPOINTMENTS.URL(pageNo, perPage, appointmentTime),
  );
  requestHeadersWoOrg['Access-Token'] = accessToken;
  return await Axios.get(
    LIST_APPOINTMENTS.URL(pageNo, perPage, appointmentTime),
    {
      headers: requestHeadersWoOrg,
    },
  );
};

export const getCatsSubcats = async accessToken => {
  requestHeaders['Access-Token'] = accessToken;
  return await Axios.get(CATS_SUBCATS.URL, {headers: requestHeaders});
};

export const getItemDetailsByName = async (accessToken, productName) => {
  requestHeadersWoOrg['Access-Token'] = accessToken;
  return await Axios.get(DETAILS_BY_NAME.URL(productName), {
    headers: requestHeadersWoOrg,
  });
};

export const postNewOrder = (accessToken, orderDetails) => {
  requestHeadersWoOrg['Access-Token'] = accessToken;
  console.log('orderDetails', orderDetails);
  return Axios.post(
    NEW_ORDER.URL,
    {
      ...orderDetails,
    },
    {headers: requestHeadersWoOrg},
  );
};

export const getItemsByBarcode = (accessToken, scanCode) => {
  requestHeadersWoOrg['Access-Token'] = accessToken;
  return Axios.get(ITEMS_DETAILS_BY_SCAN_BARCODE.URL(scanCode), {
    headers: requestHeadersWoOrg,
  });
};
