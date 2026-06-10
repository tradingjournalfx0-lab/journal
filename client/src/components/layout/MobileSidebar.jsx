import { Menu } from "lucide-react";

export default function MobileSidebar() {

  return (

    <div className="lg:hidden fixed top-5 left-5 z-50">

      <button className="bg-purple-600 p-3 rounded-xl">

        <Menu size={24} />

      </button>

    </div>

  );
}