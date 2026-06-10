import jsPDF from "jspdf";

const exportPDF = (
  trades
) => {

  const doc =
    new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Trading Journal Report",
    20,
    20
  );

  let y = 40;

  trades.forEach(
    (trade,index)=>{

      doc.setFontSize(12);

      doc.text(

        `${index + 1}. ${trade.symbol} | ${trade.side} | Profit: $${trade.profit}`,

        20,

        y

      );

      y += 10;

    }
  );

  doc.save(
    "trading-journal.pdf"
  );

};

export default exportPDF;