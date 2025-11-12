

import * as Svgicons from "./menusvg-icons";

export const MENUITEMS: any = [

  {
     menutitle:'MAIN'
  },
  {
    title: "Dashboards", icon: Svgicons.Dashboardicon, type: "sub", active: false, dirchange: false, children: [
      { path: `${import.meta.env.BASE_URL}dashboards/sales`, icon: Svgicons.Salesicon, type: "link", active: false, selected: false, dirchange: false, title: "Sales" },
      { path: `${import.meta.env.BASE_URL}dashboards/analytics`, icon: Svgicons.Analyticsicon, type: "link", active: false, selected: false, dirchange: false, title: "Analytics" },
    ]
  },
]
