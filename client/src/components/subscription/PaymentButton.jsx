
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

      console.log(
        "PAYMENT STARTED"
      );





      // =========================
      // TOKEN
      // =========================

      const token =
      localStorage.getItem(
        "token"
      );




      console.log(
        "TOKEN:",
        token
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




      console.log(
        "SDK LOADED:",
        loaded
      );




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
        "/profile"
      );




      console.log(
        "PROFILE:",
        profileResponse.data
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

        }

      );




      console.log(
        "ORDER:",
        response.data
      );






      // =========================
      // PLAN
      // =========================

      let plan =
      "1 Month";




      if (
        Number(amount) === 79
      ) {

        plan =
        "6 Months";

      }

      else if (
        Number(amount) === 149
      ) {

        plan =
        "1 Year";

      }

      else if (
        Number(amount) === 299
      ) {

        plan =
        "Lifetime";

      }






      // =========================
      // OPTIONS
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
        // SUCCESS
        // =========================

        handler:
        async function (payment) {

          console.log(
            "RAZORPAY SUCCESS"
          );

          console.log(
            payment
          );





          try {

            const body = {

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

            };





            console.log(
              "SENDING:",
              body
            );





            const saveResponse =
            await api.post(

              "/payment/success",

              body

            );





            console.log(

              "SAVE RESPONSE:",

              saveResponse.data

            );





            alert(
              "Subscription Activated ✅"
            );





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
        // PAYMENT FAILED
        // =========================

        modal: {

          ondismiss: function () {

            console.log(
              "PAYMENT CLOSED"
            );

          },

        },






        // =========================
        // PREFILL
        // =========================

        prefill: {

          name:
          profile?.fullName || "",

          email:
          profile?.email || "",

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




      razorpay.on(

        "payment.failed",

        function (response) {

          console.log(

            "PAYMENT FAILED:",

            response

          );

        }

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

