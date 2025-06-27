const Url = require('../models/Url');
const generateShortcode = require('../utils/generateShortcode');

exports.createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  let code = shortcode || generateShortcode();
  const existing = await Url.findOne({ shortcode: code });
  if (existing) return res.status(409).json({ error: 'Shortcode already in use' });

  const expiryDate = new Date(Date.now() + validity * 60000);
  const newUrl = await Url.create({ originalUrl: url, shortcode: code, expiry: expiryDate });
  res.status(201).json({ shortLink: `${req.protocol}://${req.headers.host}/${code}`, expiry: expiryDate.toISOString() });
};

exports.redirectToOriginal = async (req, res) => {
  const { shortcode } = req.params;
  const doc = await Url.findOne({ shortcode });

  if (!doc) return res.status(404).json({ error: 'Shortcode not found' });
  if (new Date() > doc.expiry) return res.status(410).json({ error: 'Link expired' });

  doc.clicks.push({
    referrer: req.get('Referrer') || 'unknown',
    location: 'coarse-location', // stub
  });

  await doc.save();
  res.redirect(doc.originalUrl);
};

exports.getStats = async (req, res) => {
  const { shortcode } = req.params;
  const urlDoc = await Url.findOne({ shortcode });

  if (!urlDoc) return res.status(404).json({ error: 'Shortcode not found' });

  res.json({
    originalUrl: urlDoc.originalUrl,
    createdAt: urlDoc.createdAt,
    expiry: urlDoc.expiry,
    totalClicks: urlDoc.clicks.length,
    clicks: urlDoc.clicks,
  });
};
