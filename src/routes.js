import Product from "views/product/index";
import Order from "views/order/index";

var routes = [    
  {
    path: "/product",
    name: "Product",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    component: Product,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    component: Order,
    layout: "/admin",
  },

];

export default routes;
