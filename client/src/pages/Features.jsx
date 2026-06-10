
import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

import dash from "../assets/dashboard.png";

import trade from "../assets/trades.png";


import anal from "../assets/analytics.png";

import jour from "../assets/journal.png";

import prof from "../assets/profile.png";

import subs from "../assets/subscription.png";





export default function Features() {

  const features = [

    {

      title:" Live Dashboard",

      desc:"Beautiful real-time dashboard with trading statistics.",

      img:dash,

      icon:"🚀",     

    },

    {

      title:"Trade Add Buy Sell",

      desc:"Save every trade with screenshots, emotions and execution notes.",

      img:trade,
      icon:"📒",

    },

    {

      title:"Analytics",

      desc:"Track win rate, drawdown, profit factor and deep trading performance.",
 
      img:anal,

      icon:"📊",

    },

    {

      title:"Trading Journal",

      desc:"Access your trading journal securely from any device.",

      img:jour,

      icon:"📝"

    },

    {

      title:"Profile",
       desc:"Manage your trader profile and account settings.",
      img:prof,
      icon:"👤",
    },

    {

      title:"Subscription Plans",

      desc:"Flexible plans with monthly, yearly and lifetime access.",

      img:subs,

      icon:"💳",

    },

   



  ];




  return (

    <div className="flex min-h-screen bg-[#050816] text-white">

      {/* SIDEBAR */}

      <Sidebar />




      {/* MAIN */}

      <div className="flex-1 ml-64 p-8">

        {/* NAVBAR */}

        <Navbar />




        {/* HEADER */}

        <div className="mt-8">

          <h1 className="text-5xl font-bold">

            Features

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Explore powerful tools designed for professional traders.

          </p>

        </div>





        {/* FEATURES GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">

          {features.map((feature,index)=>(

            <div

              key={index}

              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300">




              {/* ICON */}

              <div className="text-5xl mb-6">

                            
              <img

              src={feature.img}
              alt=""
              
              />
            
             {feature.icon}


              </div>




              {/* TITLE */}

              <h2 className="text-2xl font-bold">

                {feature.title}

              </h2>




              {/* DESC */}

              <p className="text-gray-400 mt-4 leading-7">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>





        {/* BOTTOM CTA */}

        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-500/20 border border-purple-500/20 rounded-3xl p-10 text-center">

          <h2 className="text-4xl font-bold">

            Upgrade Your Trading Journey 🚀

          </h2>

          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">

            Unlock premium analytics, unlimited trades, AI insights and more.

          </p>




          <button

            className="mt-8 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all">
            <a href="/plan">
             Explore Plans
            </a>
           

          </button>

        </div>

      </div>

    </div>

  );

}

