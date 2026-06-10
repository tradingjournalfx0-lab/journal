
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

  async (req,res)=>{

    try{

      // =========================
      // GET EMAIL
      // =========================

      const { email } =
      req.body;



      // =========================
      // VALIDATION
      // =========================

      if(!email){

        return res.status(400).json({

          message:"Email required",

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

        tls:{

          rejectUnauthorized:false,

        },

      });



      // =========================
      // MAIL OPTIONS
      // =========================

      const mailOptions = {

        from:
        process.env.EMAIL_USER,

        to:email,

        subject:
        "Trading Journal Password Reset",

        html:`

          <div style="font-family:sans-serif;padding:20px;">

            <h2>Password Reset</h2>

            <p>
              Click the button below
              to reset your password.
            </p>

            <a
              href="http://localhost:5173/reset-password"
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

          </div>

        `,

      };



      // =========================
      // SEND EMAIL
      // =========================

      await transporter.sendMail(

        mailOptions

      );



      // =========================
      // SUCCESS
      // =========================

      return res.status(200).json({

        message:
        "Reset link sent to Gmail ✅",

      });

    }catch(error){

      console.log(

        "EMAIL ERROR:",

        error.message

      );



      return res.status(500).json({

        message:
        error.message ||

        "Email sending failed ❌",

      });

    }

  }

);

module.exports =
router;

