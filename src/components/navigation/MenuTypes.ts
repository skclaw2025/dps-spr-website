export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MainMenuItem {
  id: string;

  title: string;

  image: string;

  href?: string;

  submenu: SubMenuItem[];
}