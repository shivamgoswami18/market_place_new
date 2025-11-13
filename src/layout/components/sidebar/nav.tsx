

import * as Svgicons from "./menusvg-icons";

export const MENUITEMS: any = [

  {
     menutitle:'MAIN'
  },
  {
    title: "Dashboard",
    icon: Svgicons.Dashboardicon,
    type: "link",
    path: `${import.meta.env.BASE_URL}dashboard`,
    active: false,
    selected: false,
    dirchange: false,
  },
]
