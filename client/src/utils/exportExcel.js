
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

const exportExcel = (
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
  // FORMAT DATA
  // =========================

  const data =

    trades.map((trade) => ({

      Symbol:
      trade.symbol || "-",

      Side:
      trade.side || "-",

      Entry:
      trade.entry || "-",

      Exit:
      trade.exit || "-",

      Profit:
      trade.profit || 0,

      RR:
      trade.rr || "-",

      Strategy:
      trade.strategy || "-",

      Date:
      trade.createdAt

        ?

        new Date(

          trade.createdAt

        ).toLocaleDateString()

        :

        "-",

    }));






  // =========================
  // WORKBOOK
  // =========================

  const worksheet =

    XLSX.utils.json_to_sheet(
      data
    );





  const workbook =

    XLSX.utils.book_new();





  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Trades"

  );






  // =========================
  // BUFFER
  // =========================

  const excelBuffer =

    XLSX.write(

      workbook,

      {

        bookType:"xlsx",

        type:"array",

      }

    );






  // =========================
  // FILE
  // =========================

  const fileData =

    new Blob(

      [excelBuffer],

      {

        type:

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

      }

    );






  // =========================
  // SAVE
  // =========================

  saveAs(

    fileData,

    `trading-journal-${
      Date.now()
    }.xlsx`

  );

};

export default exportExcel;

