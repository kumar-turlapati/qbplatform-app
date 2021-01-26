const apiBaseUrl = 'http://api-retail-clothing.qwikbills.com';
const pdfUrl = 'https://app.qwikbills.com';

// org id or client code
export const clientCode = 'nVlnoRYkRCGWulS';

// client name
export const clientName = 'S V FABRICS PRIVATE LIMITED';

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
  APPOINTMENT_DETAILS: {
    URL: appointmentCode =>
      `${apiBaseUrl}/crm-object/details/appointment/${appointmentCode}`,
  },
  DELETE_APPOINTMENT: {
    URL: appointmentCode =>
      `${apiBaseUrl}/crm-object/delete/appointment/${appointmentCode}`,
  },
  LIST_APPOINTMENTS: {
    URL: (pageNo, perPage, appointmentTime, fromDate, toDate) =>
      `${apiBaseUrl}/crm-object/list/appointment?pageNo=${pageNo}&perPage=${perPage}&appointmentTime=${appointmentTime}&fromDate=${fromDate}&toDate=${toDate}`,
  },
  CUSTOMER_NAMES: {
    URL: name => `${apiBaseUrl}/customers/ac/get-names?q=${name}&limit=20`,
  },
  PRODUCT_NAMES: {
    URL: searchString =>
      `${apiBaseUrl}/products/ac?q=${searchString}&limit=25&it=p`,
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
  GET_CUSTOMER_BILLNOS: {
    URL: customerName =>
      `${apiBaseUrl}/fin/receipts-get-billnos?customerName=${customerName}`,
  },
  CATALOGS: {URL: `${apiBaseUrl}/app/v1/catalog`},
  CATALOG_DETAILS: {
    URL: catalogCode => `${apiBaseUrl}/app/v1/catalog/details/${catalogCode}`,
  },
  CATALOG_ITEMS_AC: {
    URL: `${apiBaseUrl}/catalog/item/ac`,
  },
  DETAILS_BY_NAME: {
    URL: productName =>
      `${apiBaseUrl}/inventory/get-item-details-by-name?itemName=${productName}`,
  },
  NEW_ORDER: {URL: `${apiBaseUrl}/app/v1/order`},
  ORDER_DETAILS: {
    URL: orderCode => `${apiBaseUrl}/app/v1/order/${orderCode}`,
  },
  CANCEL_ORDER: {
    URL: orderCode => `${apiBaseUrl}/app/v1/order/${orderCode}`,
  },
  ITEMS_DETAILS_BY_SCAN_BARCODE: {
    URL: scanCode =>
      `${apiBaseUrl}/inventory/get-item-details-by-barcode?scanCode=${scanCode}`,
  },
  GET_ALL_ORDERS: {
    URL: executiveId => `${apiBaseUrl}/app/v1/orders/${executiveId}?by=exe`,
  },
  GET_CAMPAIGNS: {
    URL: `${apiBaseUrl}/campaign/live`,
  },
  CATS_SUBCATS: {
    URL: `${apiBaseUrl}/app/v1/cats-subcats`,
  },
  CATALOG_ITEMS_AC: {
    URL: `${apiBaseUrl}/catalog/item/ac`,
  },
  CATALOG_ITEM_DETAILS: {
    URL: `${apiBaseUrl}/app/v1/item-details`,
  },
  APP_CONTENT: {
    URL: `${apiBaseUrl}/app/v1/app-content`,
  },
  CATALOGS: {URL: `${apiBaseUrl}/app/v1/catalog`},
  CATALOG_DETAILS: {
    URL: (catalogCode, byType) =>
      `${apiBaseUrl}/app/v1/catalog/details/${catalogCode}?by=${byType}`,
  },
  GET_USER_STATS: {
    URL: uuid => `${apiBaseUrl}/user-stats/${uuid}`,
  },
  PRINT_INDENT_WR: {
    URL: (indentNo, token, clientCode) =>
      `${pdfUrl}/app-print-indent?indentNo=${indentNo}&token=${token}&clientCode=${clientCode}`,
  },
  PRINT_INDENT_WOR: {
    URL: (indentNo, token, clientCode) =>
      `${pdfUrl}/app-print-indent-wor?indentNo=${indentNo}&token=${token}&clientCode=${clientCode}`,
  },
};

// appointment statuses
export const apptStatusList = [
  {typeId: 1300, typeName: 'To Do'},
  {typeId: 1301, typeName: 'In Progress'},
  {typeId: 1302, typeName: 'Cancelled'},
  {typeId: 1303, typeName: 'Completed'},
];

// appointment types
export const apptTypes = [
  {typeId: 1200, typeName: 'Virtual'},
  {typeId: 1201, typeName: 'Physical'},
];

// appointment responses
export const apptResponsesList = [
  {typeId: 704, typeName: 'Tobe added'},
  {typeId: 700, typeName: 'Interested'},
  {typeId: 701, typeName: 'Not interested'},
  {typeId: 702, typeName: 'Unable to reach'},
  {typeId: 703, typeName: 'No Response'},
];

// appointment purpose list
export const apptPurposeList = [
  {typeId: 1100, typeName: 'Marketing activity'},
  {typeId: 1101, typeName: 'Sales activity'},
  {typeId: 1102, typeName: 'Payment followup'},
];

// payment methods
export const paymentMethods = [
  {paymentMethodKey: 'c', paymentMethodName: 'Cash'},
  {paymentMethodKey: 'b', paymentMethodName: 'Bank'},
];

// payment methods
// export const paymentTypes = ['Wholesale', 'Retail', 'Online', 'Exmill'];
export const paymentTypes = ['Wholesale', 'Retail'];
