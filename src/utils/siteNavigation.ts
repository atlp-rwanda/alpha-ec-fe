import { IconType } from 'react-icons';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';
import { FaRegMessage } from 'react-icons/fa6';

export interface NavigationSubmenuInterface {
  title: string;
  url: string;
  label: string;
  access: 'all';
}

export interface NavigationInterface {
  title: string;
  url: string;
  icon: IconType | null;
  label: string;
  access: 'all';
  subMenus: NavigationSubmenuInterface[];
}

export const TOP_MENUS: NavigationInterface[] = [
  {
    icon: null,
    title: 'Home',
    label: 'Home',
    url: '/',
    access: 'all',
    subMenus: []
  },
  {
    icon: null,
    title: 'shops',
    label: 'Shops',
    url: '/',
    access: 'all',
    subMenus: []
  },
  {
    icon: null,
    title: 'Products',
    label: 'Products',
    url: '/products',
    access: 'all',
    subMenus: []
  }
];

export const PRODUCT_ICONS: NavigationInterface[] = [
  {
    title: 'account',
    label: 'CHAT',
    access: 'all',
    url: '/chat',
    icon: FaRegMessage,
    subMenus: []
  },
  {
    title: 'orders',
    label: 'ORDERS',
    access: 'all',
    url: '/orders',
    icon: MdOutlineBookmarkBorder,
    subMenus: []
  },
  {
    title: 'account',
    label: 'ACCOUNT',
    access: 'all',
    url: '/profile',
    icon: VscAccount,
    subMenus: []
  }
];
