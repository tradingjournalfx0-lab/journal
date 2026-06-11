import api from "../../services/api";

export default function PaymentButton({

  title = "Subscribe Now",

  amount = 1,

}) {




  // =========================
  // LOAD RAZORPAY
  // =========================

  const loadRazorpay =
  () => {

    return new Promise((resolve) => {

      const script =
      document.createElement("script");




      script.src =
      "https://checkout.razorpay.com/v1/checkout.js";




      script.onload =
      () => resolve(true);




      script.onerror =
      () => resolve(false);




      document.body.appendChild(
        script
      );

    });

  };






  // =========================
  // HANDLE PAYMENT
  // =========================

  const handlePayment =
  async () => {

    try {





      // =========================
      // TOKEN
      // =========================

      const token =
      localStorage.getItem(
        "token"
      );




      if (!token) {

        alert(
          "Please login first"
        );

        return;

      }





      // =========================
      // LOAD SDK
      // =========================

      const loaded =
      await loadRazorpay();




      if (!loaded) {

        alert(
          "Razorpay SDK Failed"
        );

        return;

      }





      // =========================
      // GET PROFILE
      // =========================

      const profileResponse =
      await api.get(

        "/profile",

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

          },

        }

      );




      const profile =
      profileResponse.data;






      // =========================
      // CREATE ORDER
      // =========================

      const response =
      await api.post(

        "/payment/create-order",

        {

          amount:
          Number(amount),

        },

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

          },

        }

      );






      // =========================
      // PLAN LOGIC
      // =========================

      let plan =
      "1 Month";




      // 6 MONTHS

      if (
        Number(amount) === 79
      ) {

        plan =
        "6 Months";

      }




      // 1 YEAR

      else if (
        Number(amount) === 149
      ) {

        plan =
        "1 Year";

      }




      // LIFETIME

      else if (
        Number(amount) === 299
      ) {

        plan =
        "Lifetime";

      }







      // =========================
      // RAZORPAY OPTIONS
      // =========================

      const options = {

        key:
        import.meta.env
        .VITE_RAZORPAY_KEY,




        amount:
        response.data.amount,




        currency:
        response.data.currency,




        order_id:
        response.data.id,




        name:
        "Trading Journal",




        description:
        `${plan} Subscription`,




        image:
        "/logo.png",





        // =========================
        // PAYMENT SUCCESS
        // =========================

        handler:
        async function (payment) {

          try {

            const saveResponse =
            await api.post(

              "/payment/success",

              {

                amount:
                Number(amount),

                paymentId:
                payment
                .razorpay_payment_id,

                orderId:
                payment
                .razorpay_order_id,

                razorpay_signature:
                payment
                .razorpay_signature,

                plan,

              },

              {

                headers: {

                  Authorization:
                  `Bearer ${token}`,

                },

              }

            );




            console.log(

              "SUBSCRIPTION:",

              saveResponse.data

            );




            alert(
              "Payment Successful ✅"
            );




            // REFRESH

            window.location.reload();

          } catch (error) {

            console.log(

              "SAVE ERROR:",

              error.response?.data ||

              error.message

            );




            alert(

              error.response?.data
              ?.message ||

              "Subscription Save Failed"

            );

          }

        },







        // =========================
        // PREFILL
        // =========================

        prefill: {

          name:
          profile?.fullName ||

          "",




          email:
          profile?.email ||

          "",

        },







        // =========================
        // THEME
        // =========================

        theme: {

          color:
          "#7c3aed",

        },

      };







      // =========================
      // OPEN PAYMENT
      // =========================

      const razorpay =
      new window.Razorpay(
        options
      );




      razorpay.open();

    } catch (error) {

      console.log(

        "PAYMENT ERROR:",

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data
        ?.message ||

        "Payment Failed ❌"

      );

    }

  };







  return (

    <button

      onClick={handlePayment}

      className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 py-4 rounded-2xl font-semibold text-lg"

    >

      {title}

    </button>

  );

}