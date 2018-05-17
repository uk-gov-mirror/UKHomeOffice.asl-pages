module.exports = () => (req, res, next) => {
  if (res.template && req.query.format === 'pdf') {
    if (res.pdfTemplate) {
      return res.pdf(res.pdfTemplate);
    }
    throw new Error('PDF rendering is not suported for this page');
  }
  next();
};
