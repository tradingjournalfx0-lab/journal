
const express =
require("express");

const router =
express.Router();

const nodemailer =
require("nodemailer");

const {

  registerUser,

  loginUser,

  resetPassword,

} = require(

  "../controllers/authController"

);




// =========================
// REGISTER
// =========================

router.post(

  "/register",

  registerUser

);




// =========================
// LOGIN
// =========================

router.post(

  "/login",

  loginUser

);




// =========================
// RESET PASSWORD
// =========================

router.post(

  "/reset-password",

  resetPassword

);




// =========================
// FORGOT PASSWORD
// =========================

router.post(

  "/forgot-password",

  async(req,res)=>{

    try{

      // =========================
      // EMAIL
      // =========================

      const { email } =
      req.body;





      // =========================
      // VALIDATION
      // =========================

      if(!email){

        return res.status(400).json({

          success:false,

          message:
          "Email required",

        });

      }






      // =========================
      // TRANSPORTER
      // =========================

      const transporter =

      nodemailer.createTransport({

        service:"gmail",

        auth:{

          user:
          process.env.EMAIL_USER,

          pass:
          process.env.EMAIL_PASS,

        },

      });






      // =========================
      // RESET LINK
      // =========================

      const resetLink =

      `https://www.tradingjournalfx.in/reset-password?email=${email}`;






      // =========================
      // MAIL OPTIONS
      // =========================

      const mailOptions = {

        from:
        process.env.EMAIL_USER,

        to:
        email,

        subject:
        "Trading Journal FX Password Reset",

        html:`

          <div style="font-family:sans-serif;padding:20px;">

            <h2>

              Trading Journal FX

            </h2>

            <p>

              Click the button below
              to reset your password.

            </p>

            <a

              href="${resetLink}"

              style="
                display:inline-block;
                padding:12px 24px;
                background:#7c3aed;
                color:white;
                text-decoration:none;
                border-radius:10px;
                margin-top:15px;
              "

            >

              Reset Password

            </a>

            <p style="margin-top:20px;color:gray;">

              If you did not request this,
              you can ignore this email.

            </p>

          </div>

        `,

      };






      // =========================
      // SEND EMAIL
      // =========================

      await transporter.sendMail(

        mailOptions

      );






      console.log(

        "RESET EMAIL SENT ✅"

      );






      // =========================
      // RESPONSE
      // =========================

      return res.status(200).json({

        success:true,

        message:
        "Reset link sent successfully ✅",

      });

    }catch(error){

      console.log(

        "FORGOT PASSWORD ERROR:",

        error

      );





      return res.status(500).json({

        success:false,

        message:

          error.message ||

          "Email sending failed ❌",

      });

    }

  }

);




// =========================
// EXPORT
// =========================

module.exports =
router;

