import {

  LayoutDashboard,
  CandlestickChart,
  BarChart3,
  BookOpen,
  User,
  CreditCard,
  Settings,

} from "lucide-react";

import {

  NavLink,

} from "react-router-dom";

export default function Sidebar() {

  const menuItems = [

    {
      name:"Dashboard",
      path:"/dashboard",
      icon:<LayoutDashboard size={22}/>
    },

    {
      name:"Trades",
      path:"/trades",
      icon:<CandlestickChart size={22}/>
    },

    {
      name:"Analytics",
      path:"/analytics",
      icon:<BarChart3 size={22}/>
    },

    {
      name:"Journal",
      path:"/journal",
      icon:<BookOpen size={22}/>
    },

    {
      name:"Profile",
      path:"/profile",
      icon:<User size={22}/>
    },

    {
      name:"Subscription",
      path:"/subscription",
      icon:<CreditCard size={22}/>
    },

    {
      name:"Settings",
      path:"/settings",
      icon:<Settings size={22}/>
    },

  ];

  return (

    <div className="fixed left-0 top-0 w-65 h-screen bg-[#0B1120] border-r border-white/10 p-6">

      <h1 className="text-4md font-bold text-purple-500">

        Tradin Journal FX

      </h1>

      {/* <p className="text-gray-400 mt-2">
         Powered by
        Raftar Trader FX 

      </p> */}

      <div className="mt-10 flex flex-col gap-3">

        {menuItems.map((item,index)=>(

          <NavLink

            key={index}

            to={item.path}

            className={({isActive})=>

              `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300

              ${isActive

                ? "bg-purple-600 text-white"

                : "hover:bg-white/10 text-gray-300"

              }`

            }

          >

            {item.icon}

            <span className="text-lg font-medium">

              {item.name}

            </span>

          </NavLink>

        ))}

      </div>

      

    </div>

  );

}