require("dotenv").config();
import nodemailer from "nodemailer";
import { Buffer } from "buffer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "Van Den <phamden4705@gmail.com>",
    to: dataSend.receiverEmail,
    subject: "Thong tin dat lich kham benh",
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Luke Pham channel</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Xin chan thanh cam on</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on Luke Pham channel</p>

    <p>Appointment information:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is true, please click on the link below to confirm and complete the appointment booking procedure.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Thank you very much</div>
    `;
  }
  return result;
};

let sendAttachment = (dataSend) => {
  console.log("imgBase64 received:", dataSend.imgBase64?.substring(0, 50));

  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: "Van Den <phamden4705@gmail.com>",
        to: dataSend.email,
        subject: "Ket qua dat lich kham benh",
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            // content: dataSend.imgBase64.split("base64,")[1],
            content: dataSend.imgBase64
              ? dataSend.imgBase64.split("base64,")[1]
              : "",
            encoding: "base64",
          },
        ],
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Luke Pham channel</p>
    <p>Thông tin don thuoc/hoa don duoc gui trong file dinh kem</p>
    <div>Xin chan thanh cam on</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on Luke Pham channel</p>
    <p>bla bla</p>
    <div>Thank you very much</div>
    `;
  }
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  getBodyHTMLEmail: getBodyHTMLEmail,
  sendAttachment: sendAttachment,
};
