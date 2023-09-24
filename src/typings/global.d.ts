/* Menu */
declare namespace Menu {
  interface MetaProps {
    icon?: string;
    title: string;
    activeMenu?: string;
    link?: string;
    hide?: boolean;
    full?: boolean;
    affix?: boolean;
    keepAlive?: boolean;
  }

  interface MenuOption {
    path: string;
    name?: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOption[];
  }
}
