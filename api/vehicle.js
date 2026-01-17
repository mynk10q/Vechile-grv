export default async function handler(req, res) {
  try {
    const { onlymynk } = req.query;

    if (!onlymynk) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number required",
        example: "/api/vehicle?onlymynk=MH28AL7284"
      });
    }

    const API_KEY = "ZEPH-0SL3V";
    const url = `https://zephrex-num.gauravyt566.workers.dev/?key=${API_KEY}&type=VEHICLE&term=${onlymynk}`;

    const response = await fetch(url);
    const data = await response.json();

    // ❌ REMOVE unwanted keys if present
    delete data["BUY API"];
    delete data["SUPPORT"];
    delete data["buy_api"];
    delete data["support"];

    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      result: data
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message
    });
  }
}
