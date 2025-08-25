export const notFound = (req, res, next) => {
 res.status(404).json({ ok: false, message: 'Not Found - ' + req.originalUrl });
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode);
  res.json({
    ok: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}