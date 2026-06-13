
import {

  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";




// =========================
// PAGES
// =========================

import Dashboard from "../pages/Dashboard";

import Trades from "../pages/Trades";

import Analytics from "../pages/Analytics";

import Journal from "../pages/Journal";

import Profile from "../pages/Profile";

import Subscription from "../pages/Subscription";

import Settings from "../pages/Settings";

import Login from "../pages/Login";

import Register from "../pages/Register";

import Forgot from "../pages/Forgot";

import ResetPassword from "../pages/ResetPassword";

import NotFound from "../pages/NotFound";

import Home from "../components/home/Home";

import Features from "../pages/Features";

import Footer from "../Footer"



import PrivacyPolicy
from "../pages/PrivacyPolicy";

import Terms
from "../pages/Terms";

import RefundPolicy
from "../pages/RefundPolicy";

import Contact
from "../pages/Contact";

import About
from "../pages/About";




// =========================
// PROTECTED ROUTES
// =========================

import ProtectedRoute
from "../components/auth/ProtectedRoute";

import SubscriptionRoute
from "../components/auth/SubscriptionRoute";
import Plan from "../components/subscription/Plan";




export default function AppRoutes(){

  return(

    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC LEGAL PAGES
        ========================== */}
              <Route

               path="/privacy-policy"

               element={<PrivacyPolicy />}

              />

              <Route

               path="/terms"

                element={<Terms />}

              />

              <Route

               path="/refund-policy"

               element={<RefundPolicy />}

              />

              <Route

               path="/contact"

                element={<Contact />}

              />

              <Route

                path="/about"

                element={<About />}

              />



        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route

          path="/"

          element={<Home />}

        />

       
         <Route
            path="/feature"
            element={<Features />}
         />






        <Route

          path="/login"

          element={<Login />}

        />

            <Route
               path="/forgot-password"
               element={<Forgot />}
            />

            <Route
               path="/reset-password"
                element={<ResetPassword />}
            />


        <Route

          path="/register"

          element={<Register />}

        />

        <Route
        path="/plan"
        element={<Plan/>}
        />


       <Route
       path="/footer"
       element={<Footer/>}
       />


        {/* =========================
            SUBSCRIPTION PAGE
        ========================== */}

        <Route

          path="/subscription"

          element={

            <ProtectedRoute>

              <Subscription />

            </ProtectedRoute>

          }

        />





        {/* =========================
            DASHBOARD
        ========================== */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <SubscriptionRoute>

                <Dashboard />

              </SubscriptionRoute>

            </ProtectedRoute>

          }

        />





        {/* =========================
            TRADES
        ========================== */}

        <Route

          path="/trades"

          element={

            <ProtectedRoute>

              <SubscriptionRoute>

                <Trades />

              </SubscriptionRoute>

            </ProtectedRoute>

          }

        />





        {/* =========================
            ANALYTICS
        ========================== */}

        <Route

          path="/analytics"

          element={

            <ProtectedRoute>

              <SubscriptionRoute>

                <Analytics />

              </SubscriptionRoute>

            </ProtectedRoute>

          }

        />





        {/* =========================
            JOURNAL
        ========================== */}

        <Route

          path="/journal"

          element={

            <ProtectedRoute>

              <SubscriptionRoute>

                <Journal />

              </SubscriptionRoute>

            </ProtectedRoute>

          }

        />





        {/* =========================
            PROFILE
        ========================== */}

        <Route

          path="/profile"

          element={

             <ProtectedRoute>

               <SubscriptionRoute>

                <Profile />

               </SubscriptionRoute>

            </ProtectedRoute>

          }

        />





        {/* =========================
            SETTINGS
        ========================== */}

        <Route

          path="/settings"

          element={

            <ProtectedRoute>

              <SubscriptionRoute>

                <Settings />

              </SubscriptionRoute>

            </ProtectedRoute>

          }

        />





        {/* =========================
            404
        ========================== */}

        <Route

          path="*"

          element={<NotFound />}

        />

      </Routes>

    </BrowserRouter>

  );

}

