import React, { Fragment } from 'react';
import classnames from 'classnames';
import ApplyChanges from '../containers/apply-changes';

const PaginationControls = ({
  totalPages,
  limit,
  page,
  count,
  onPageChange
}) => {
  const pagesToShow = () => {
    const end = Math.min(totalPages, Math.max(5, page + 3));
    const start = Math.max(0, end - 5);
    return Array.from(Array(totalPages).keys()).slice(start, end);
  };
  const links = [
    {
      ariaLabel: 'Previous page',
      className: 'prev',
      label: <Fragment><span aria-hidden="true" role="presentation">&laquo;</span> Previous</Fragment>,
      target: (page - 1) || 0,
      disabled: page <= 0
    },
    ...pagesToShow().map(p => ({
      ariaLabel: `Page ${p + 1}`,
      label: p + 1,
      target: p,
      disabled: page === p
    })),
    {
      ariaLabel: 'Next page',
      className: 'next',
      label: <Fragment>Next <span aria-hidden="true" role="presentation">&raquo;</span></Fragment>,
      target: page + 1,
      disabled: page >= totalPages - 1
    }
  ];
  return (
    <nav role="navigation" aria-label="Pagination">
      <div className="pagination-summary">{`Showing ${count ? page * limit + 1 : 0} – ${(page + 1) * limit < count ? (page + 1) * limit : count} of ${count} results`}</div>
      <ul className="pagination">
        {
          links.map((link, key) =>
            <li className="pagination-item" key={key}>
              <ApplyChanges
                label={link.label}
                className={classnames('pagination-link', { current: link.disabled }, link.className)}
                aria-label={link.ariaLabel}
                query={{
                  page: link.target + 1
                }}
                aria-current={link.target === page}
                onApply={() => onPageChange(link.target)}
              />
            </li>
          )
        }
      </ul>
    </nav>
  );
};

export default PaginationControls;
