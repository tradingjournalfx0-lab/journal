import PaymentButton from "./PaymentButton";

export default function PricingCard({

  title,
  price,
  features = [],
  active = false,
  amount = 0,

}) {




  // =========================
  // PLAN TYPES
  // =========================

  const isFree =
  title === "Free";




  const isLifetime =
  title === "Lifetime";




  const isPremium =
  title === "Premium";





  return (

    <div

      className={`rounded-3xl p-8 border transition-all duration-300 relative overflow-hidden hover:scale-105

      ${active

        ? "bg-purple-600/20 border-purple-500 shadow-2xl shadow-purple-500/20"

        : "bg-white/5 border-white/10 hover:border-purple-500/30"

      }`}>




      {/* POPULAR BADGE */}

      {isPremium && !active && (

        <div className="absolute top-5 right-5 bg-purple-600 px-4 py-2 rounded-xl text-sm font-semibold">

          POPULAR

        </div>

      )}




      {/* ACTIVE BADGE */}

      {active && (

        <div className="absolute top-5 right-5 bg-green-500 px-4 py-2 rounded-xl text-sm font-semibold">

          ACTIVE

        </div>

      )}





      {/* HEADER */}

      <div className="mb-8">




        {/* TITLE */}

        <h2

          className={`text-3xl font-bold

          ${isLifetime

            ? "text-yellow-400"

            : active

            ? "text-purple-400"

            : ""

          }`}>

          {title}

        </h2>




        {/* PRICE */}

        <div className="mt-4 flex items-end gap-2">

          <h3 className="text-5xl font-bold">

            ₹{price}

          </h3>




          {!isLifetime && !isFree && (

            <span className="text-gray-400 mb-2">

              /month

            </span>

          )}

        </div>

      </div>





      {/* FEATURES */}

      <div className="space-y-4">

        {features.map((feature,index)=>(

          <div

            key={index}

            className="flex items-center gap-3">




            {/* CHECK ICON */}

            <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">

              ✓

            </div>




            {/* TEXT */}

            <span className="text-gray-300">

              {feature}

            </span>

          </div>

        ))}

      </div>





      {/* BUTTON */}

      <div className="mt-10">




        {/* ACTIVE */}

        {active ? (

          <button

            disabled

            className="w-full py-4 rounded-2xl font-semibold bg-purple-600 cursor-default">

            Current Plan

          </button>

        )




        /* FREE */

        : isFree ? (

          <button

            disabled

            className="w-full py-4 rounded-2xl font-semibold bg-white/10 text-gray-300 cursor-default">

            Free Plan

          </button>

        )




        /* PAID */

        : (

          <PaymentButton

            title={

              isLifetime

              ? "Buy Lifetime"

              : "Upgrade Plan"

            }

            amount={amount}

          />

        )}

      </div>

    </div>

  );

}