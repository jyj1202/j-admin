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

declare module global {
  /**
   * @deprecated stop to use null
   * @see {@link https://github.com/sindresorhus/meta/discussions/7}
   */
  type Nullable<T> = T | null
  type Arrayable<T> = T | T[]
  type Awaitable<T> = Promise<T> | T
  type NotNull = string|number|boolean|undefined|bigint|symbol
  type Primitive =  Nullable<NotNull>
}
