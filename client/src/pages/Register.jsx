import RegisterForm from "../components/auth/RegisterForm";

import HomeNavbar from "../components/home/HomeNavbar";

export default function Register() {

  return (

    <div className="
    min-h-screen
    bg-[#050816]
    text-white
    ">

      {/* =========================
          NAVBAR
      ========================= */}

      <HomeNavbar />



      {/* =========================
          REGISTER AREA
      ========================= */}

      <div className="
      flex
      items-center
      justify-center
      px-5
      ">

        <RegisterForm />

      </div>

    </div>

  );

}