const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // true para 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVisitNotification = async (visitData) => {
  const { ip, city, region, country, source, timestamp } = visitData;

  const mailOptions = {
    from: `"Portfolio Tracker" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_TO,
    subject: `📍 Nueva visita desde ${ip}`,
    html: `
      <p><strong>IP:</strong> ${ip}</p>
      <p><strong>Ubicación:</strong> ${city}, ${region}, ${country}</p>
      <p><strong>Fuente:</strong> ${source}</p>
      <p><strong>Hora:</strong> ${new Date(timestamp).toLocaleString()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📬 Notificación de visita enviada');
  } catch (error) {
    console.error('❌ Error al enviar el email:', error.message);
  }
};

module.exports = sendVisitNotification;
