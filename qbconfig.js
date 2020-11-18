const apiBaseUrl = 'http://api-retail-clothing.qwikbills.com';

// org id or client code
export const clientCode = 'nVlnoRYkRCGWulS';

// client name
export const clientName = 'S V FABRICS';

// this can be used where there is a need for org id
export const requestHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Org-Id': clientCode,
  Accept: 'application/json',
};

// this can be used where there is a no need for org id.
// add key Auth-Token
export const requestHeadersWoOrg = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
};

// cdn url for images
export const cdnUrl = 'https://dgufxvy74ps27.cloudfront.net';

// end points
export const restEndPoints = {
  LOGIN: {URL: `${apiBaseUrl}/authorize/app`},
  RESEND_OTP: {URL: `${apiBaseUrl}/app/v1/resend-otp`}, // Org-Id header required
  GET_TOKEN: {URL: `${apiBaseUrl}/app/v1/get-token`}, // Org-Id header required
  CREATE_APPOINTMENT: {URL: `${apiBaseUrl}/crm-object/create/appointment`},
  UPDATE_APPOINTMENT: {
    URL: appointmentCode =>
      `${apiBaseUrl}/crm-object/update/appointment/${appointmentCode}`,
  },
  DELETE_APPOINTMENT: {
    URL: appointmentCode =>
      `${apiBaseUrl}/crm-object/update/appointment/${appointmentCode}`,
  },
  LIST_APPOINTMENTS: {
    URL: (pageNo, perPage, appointmentTime) =>
      `${apiBaseUrl}/crm-object/list/appointment?pageNo=${pageNo}&perPage=${perPage}&appointmentTime=${appointmentTime}`,
  },
  CUSTOMER_NAMES: {
    URL: name => `${apiBaseUrl}/customers/ac/get-names?q=${name}`,
  },
  PRODUCT_NAMES: {
    URL: searchString => `${apiBaseUrl}/products/ac?q=${searchString}`,
  },
  CREATE_RECEIPT: {URL: `${apiBaseUrl}/fin/receipts/${clientCode}`},
  UPDATE_RECEIPT: {
    URL: receiptNo => `${apiBaseUrl}/fin/receipts/${receiptNo}/${clientCode}`,
  },
  RECEIPT_DETAILS: {
    URL: receiptNo => `${apiBaseUrl}/fin/receipts/${receiptNo}/${clientCode}`,
  },
  LIST_RECEIPTS: {
    URL: uuid => `${apiBaseUrl}/fin/receipts-by-exe/${uuid}`,
  },
  DELETE_RECEIPT: {
    URL: receiptNo => `${apiBaseUrl}/fin/receipts/${receiptNo}/${clientCode}`,
  },
  CATALOGS: {URL: `${apiBaseUrl}/app/v1/catalog`},
  CATALOG_DETAILS: {
    URL: catalogCode => `${apiBaseUrl}/app/v1/catalog/details/${catalogCode}`,
  },
  CATS_SUBCATS: {
    URL: `${apiBaseUrl}/app/v1/cats-subcats`,
  },
  DETAILS_BY_NAME: {
    URL: productName =>
      `${apiBaseUrl}/inventory/get-item-details-by-name?itemName=${productName}`,
  },
  NEW_ORDER: {URL: `${apiBaseUrl}/app/v1/order`},
  ITEMS_DETAILS_BY_SCAN_BARCODE: {
    URL: scanCode =>
      `${apiBaseUrl}/inventory/get-item-details-by-barcode?scanCode=${scanCode}`,
  },
};

// appointment statuses
export const apptStatusList = {
  1300: 'To Do',
  1301: 'In Progress',
  1302: 'Cancelled',
  1303: 'Completed',
};

// appointment responses
export const apptResponsesList = {
  704: 'Tobe added',
  700: 'Interested',
  701: 'Not interested',
  702: 'Unable to reach',
  703: 'No Response',
};

// appointment purpose list
export const apptPurposeList = {
  1100: 'Marketing activity',
  1101: 'Sales activity',
  1102: 'Payment followup',
};

// payment methods
export const paymentMethods = {
  c: 'Cash',
  b: 'Bank',
};

// payment methods
export const paymentTypes = ['wholesale', 'retail', 'online', 'exmill'];
