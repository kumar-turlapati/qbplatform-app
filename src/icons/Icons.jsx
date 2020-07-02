import React from 'react';
import { Image, ImageProps } from 'react-native';

const getIconStyle = (size) => {
  if (size === 'sm') return { width: 24, height: 24 };
  if (size === 'sm_l') return { width: 18, height: 21 };
  if (size === 'md_l') return { width: 54, height: 54 };
  if (size === 'lg') return { width: 64, height: 64 };
  return { width: 48, height: 48 };
};

export const IconBase = ({ size, style, ...props }) => (
  <Image style={[getIconStyle(size), style]} {...props} />
);

// export const ArrowDisabled = (props) => (
//   <IconBase size="sm" {...props} source={require('./icons/ic_arrow_disabled.png')} />
// );

export const QLogo = (props) => (
  <IconBase {...props} source={require('./Qlogo.png')} resizeMode={'contain'} />
);

export const BackIcon = (props) => (
  <IconBase {...props} source={require('./backArrow.png')} resizeMode={'contain'} />
);

export const AppointmentsIcon = (props) => (
  <IconBase {...props} source={require('./Calendar.png')} resizeMode={'contain'} />
);

export const OrdersIcon = (props) => (
  <IconBase {...props} source={require('./Order.png')} resizeMode={'contain'} />
);

export const DispatchIcon = (props) => (
  <IconBase {...props} source={require('./Dispatches.png')} resizeMode={'contain'} />
);

export const ReceiptsIcon = (props) => (
  <IconBase {...props} source={require('./Receipts.png')} resizeMode={'contain'} />
);

export const CustomersIcon = (props) => (
  <IconBase {...props} source={require('./Customer.png')} resizeMode={'contain'} />
);

export const GalleryIcon = (props) => (
  <IconBase {...props} source={require('./Gallery.png')} resizeMode={'contain'} />
);

export const MenuIcon = (props) => (
  <IconBase {...props} source={require('./Menu.png')} resizeMode={'contain'} />
);

export const LogoutIcon = (props) => (
  <IconBase {...props} source={require('./logout.png')} resizeMode={'contain'} />
);

export const BackHome = (props) => (
  <IconBase {...props} source={require('./Back.png')} resizeMode={'contain'} />
);

export const SearchIcon = (props) => (
  <IconBase {...props} style={{ width: 17, height: 17 }} source={require('./SearchIcon.png')} resizeMode={'contain'} />
);

export const BarCodeIcon = (props) => (
  <IconBase {...props} style={{ width: 23, height: 23 }} source={require('./BarCode.png')} resizeMode={'contain'} />
);

export const SideArrow = (props) => (
  <IconBase {...props} source={require('./sideArrow.png')} resizeMode={'contain'} />
);

export const SearchBlackIcon = (props) => (
  <IconBase {...props} source={require('./searchBlackIcon.png')} resizeMode={'contain'} />
);
