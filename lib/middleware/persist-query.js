const { setFilters } = require('@ukhomeoffice/asl-components/components/filters');
const { setSort } = require('@ukhomeoffice/asl-components/components/datatable');

module.exports = () => (req, res, next) => {
  if (typeof req.query.filters === 'object') {
    res.store.dispatch(setFilters(req.query.filters));
  }
  if (typeof req.query.sort === 'object') {
    const { column, ascending } = req.query.sort;
    res.store.dispatch(setSort({
      column,
      ascending: ascending === 'true'
    }));
  }
  next();
};
