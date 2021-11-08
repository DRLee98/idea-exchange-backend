import axios from "axios";
import CryptoJS from "crypto-js";

const serviceId = process.env.SENS_SERVICE_ID || "";
const accessKey = process.env.NAVER_ACCESS_KEY || "";
const secretKey = process.env.NAVER_SECRET_KEY || "";

const url = "https://sens.apigw.ntruss.com";
const url2 = `/sms/v2/services/${encodeURIComponent(serviceId)}/messages`;

const fullUrl = url + url2;
const method = "POST";

const date = Date.now().toString();

const makeSignature = () => {
  const space = " ";
  const newLine = "\n";

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
};

export const sendMessage = async (authNum: string, tel: string) => {
  const data = {
    type: "SMS",
    from: "01020312582",
    content: `[아이디어 거래소] 인증번호는 ${authNum} 입니다.`,
    messages: [
      {
        to: tel
      }
    ]
  };

  const signature = makeSignature();

  const req = await axios({
    url: fullUrl,
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-ncp-apigw-timestamp": date,
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-signature-v2": signature
    },
    data
  });

  console.log(req);
};
