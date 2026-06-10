export default function Tabs({
  tabs,
  activeTab,
  setActiveTab,
}) {

  return (

    <div className="flex gap-4 flex-wrap">

      {tabs.map((tab, index) => (

        <button
          key={index}
          onClick={() =>
            setActiveTab(tab)
          }
          className={`px-6 py-3 rounded-2xl transition-all ${
            activeTab === tab
              ? "bg-purple-600"
              : "bg-white/10 hover:bg-white/20"
          }`}>

          {tab}

        </button>

      ))}

    </div>

  );
}