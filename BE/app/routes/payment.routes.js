const https = require("https");
const crypto = require("crypto");
const db = require("../models");
const Order = db.order;
const { authJwt } = require("../middlewares");

// MoMo payment parameters
const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const partnerCode = "MOMO";
const redirectUrl = "http://localhost:3000/homepagelogin";
const ipnUrl = "http://localhost:3000/homepagelogin";
const requestType = "captureWallet";
const autoCapture = true;
const lang = "vi";

// Endpoint to create MoMo payment
module.exports = function (app) {
  app.post("/payment", [authJwt.verifyToken], async (req, res) => {
    const { userId, orderProducts, totalPrice, orderAddress, paymentMethod } =
      req.body;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const orderInfo = "pay with MoMo";
    const extraData = "";

    // Create raw signature
    const rawSignature = `accessKey=${accessKey}&amount=${totalPrice}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Generate HMAC SHA256 signature
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    // JSON object to send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: totalPrice,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      signature: signature,
    });

    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };

    // Send the request and handle the response
    const httpsReq = https.request(options, (momoRes) => {
      let data = "";
      momoRes.on("data", (chunk) => {
        data += chunk;
      });
      momoRes.on("end", async () => {
        const response = JSON.parse(data);
        if (response.resultCode === 0) {
          // Payment successful, save the order to the database
          const order = new Order({
            orderId: orderId,
            userId: userId,
            orderProducts: orderProducts,
            totalPrice: totalPrice,
            orderStatus: "pending",
            orderAddress: orderAddress,
            paymentMethod: paymentMethod,
          });
          try {
            const savedOrder = await order.save();
            res.status(200).json({
              message: "Payment successful, order saved",
              order: savedOrder,
              paymentUrl: response.payUrl,
            });
          } catch (error) {
            console.error("Error saving order:", error);
            res
              .status(500)
              .json({ error: "Payment successful, but failed to save order" });
          }
        } else {
          res.status(400).json({ error: "Payment failed", details: response });
        }
      });
    });

    httpsReq.on("error", (e) => {
      console.error(`Problem with request: ${e.message}`);
      res.status(500).json({ error: e.message });
    });

    httpsReq.write(requestBody);
    httpsReq.end();
  });
};
