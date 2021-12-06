
// import Dashboard from "views/Dashboard.js";
// import Companies from "views/companies/companies.js";
// import Courses from "views/courses/courses";
// import Exhibitions from "views/exhibitions";
// import Opportunity from "views/opportunities";
// import ProjectRace from "views/project-race";
// import CourseDetails from "views/courses/course-details";
// import ProjectRaceDetails from "views/project-race/project-race-details";
// import ExhibitionDetails from "views/exhibitions/exhibitions-details";
// import Volunteers from "views/volunteers/index";
// import ItemCosts from "views/item-costs/index";
import Estates from "views/estates/index";
import allEstates from "views/allEstates/index";
import LoginPage from "views/log-in";
import SignUp from "views/sign-up";
// import RegisterStudent from "layout/Register";

// import ItemCostDetails from "views/item-costs/item-cost-details";
// import OpportunityDetails from "views/opportunities/course-details";

var routes = [    
  {
    path: "/estates",
    name: "My Estates",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    component: Estates,
    layout: "/admin",
  },
  {
    path: "/allEstates",
    name: "All Estates",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    component: allEstates,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "",
    component: LoginPage,
    layout: "/user",
  },
  {
    path: "/signup",
    name: "",
    component: SignUp,
    layout: "/user",
  },

];

export default routes;
