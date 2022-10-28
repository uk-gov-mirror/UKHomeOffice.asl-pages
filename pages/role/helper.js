const PELH_OR_NPRC_ROLES = ['pelh', 'nprc'];

function profileReplaced(establishment, type) {
  if (!(PELH_OR_NPRC_ROLES.includes(type))) {
    return null;
  }

  if (establishment['pelh']) {
    return { ...establishment['pelh'], type: 'pelh' };
  } else if (establishment['nprc']) {
    return { ...establishment['nprc'], type: 'nprc' };
  }
}

module.exports = {
  profileReplaced,
  PELH_OR_NPRC_ROLES
};
