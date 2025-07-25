const Visit = require("../models/visit");
const axios = require('axios');


const registerVisit = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    const source = req.query.source || 'direct';


    const visit = new Visit({
      ip,
      userAgent,
      source,
      location: 'desconocida', // más adelante lo rellenamos con IP geolocation
    });
console.log('Nueva visita:', visit);
    await visit.save();
    res.status(201).json({ success: true, message: 'Visita registrada' });
  } catch (error) {
    console.error('Error al registrar visita:', error);
    res.status(500).json({ success: false, error: 'Error en el servidor' });
  }
};

const createVisit = async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.connection.remoteAddress ||
      '::1';

    // Evita guardar localhost
    if (ip === '::1') return res.status(200).json({ message: 'Localhost ignored' });

    // Llama a ipinfo.io
    const { data } = await axios.get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);

    const newVisit = new Visit({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      loc: data.loc,
      org: data.org,
      timezone: data.timezone,
      source: req.query.source || 'direct' 
    });

    await newVisit.save();
    res.status(201).json({ message: 'Visit registered' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error registering visit' });
  }
};

module.exports = { registerVisit, createVisit };
