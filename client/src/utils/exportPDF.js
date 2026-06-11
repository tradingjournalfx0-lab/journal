
import jsPDF from "jspdf";

const exportPDF = (
  trades
) => {

  // =========================
  // EMPTY CHECK
  // =========================

  if (

    !trades ||

    trades.length === 0

  ) {

    alert(
      "No trades found"
    );

    return;

  }




  // =========================
  // PDF
  // =========================

  const doc =
  new jsPDF({

    orientation:"landscape",

  });





  // =========================
  // TITLE
  // =========================

  doc.setFontSize(20);

  doc.text(

    "Trading Journal Report",

    14,

    20

  );





  // =========================
  // DATE
  // =========================

  doc.setFontSize(10);

  doc.text(

    `Generated: ${new Date().toLocaleString()}`,

    14,

    30

  );





  // =========================
  // TOTALS
  // =========================

  const totalProfit =

    trades.reduce(

      (acc,trade)=>

        acc +

        Number(
          trade.profit || 0
        ),

      0

    );





  doc.text(

    `Total Trades: ${trades.length}`,

    14,

    40

  );





  doc.text(

    `Total Profit: $${totalProfit.toFixed(2)}`,

    80,

    40

  );





  // =========================
  // TABLE START
  // =========================

  let y = 55;





  // =========================
  // HEADERS
  // =========================

  doc.setFontSize(11);

  doc.text("Symbol",14,y);

  doc.text("Side",40,y);

  doc.text("Entry",60,y);

  doc.text("Exit",85,y);

  doc.text("Profit",110,y);

  doc.text("RR",135,y);

  doc.text("Strategy",155,y);

  doc.text("Date",220,y);





  y += 5;





  // =========================
  // LINE
  // =========================

  doc.line(

    14,

    y,

    280,

    y

  );





  y += 10;





  // =========================
  // TRADES
  // =========================

  trades.forEach((trade)=>{




    // PAGE BREAK

    if(y > 180){

      doc.addPage();

      y = 20;

    }





    doc.text(

      String(
        trade.symbol || "-"
      ),

      14,

      y

    );





    doc.text(

      String(
        trade.side || "-"
      ),

      40,

      y

    );





    doc.text(

      String(
        trade.entry || "-"
      ),

      60,

      y

    );





    doc.text(

      String(
        trade.exit || "-"
      ),

      85,

      y

    );





    doc.text(

      `$${trade.profit || 0}`,

      110,

      y

    );





    doc.text(

      String(
        trade.rr || "-"
      ),

      135,

      y

    );





    doc.text(

      String(
        trade.strategy || "-"
      ),

      155,

      y

    );





    doc.text(

      trade.createdAt

      ?

      new Date(

        trade.createdAt

      ).toLocaleDateString()

      :

      "-",

      220,

      y

    );





    y += 10;

  });





  // =========================
  // SAVE
  // =========================

  doc.save(

    `trading-journal-${
      Date.now()
    }.pdf`

  );

};

export default exportPDF;

