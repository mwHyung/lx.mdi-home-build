import { Menu } from "./model";

export interface MenuTree extends Menu {
  children?: MenuTree[];
  path?: string;
}
