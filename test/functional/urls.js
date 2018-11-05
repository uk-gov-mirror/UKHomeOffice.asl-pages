module.exports = {
  place: {
    create: {
      new: '/create-place',
      confirm: '/pages/place/create/confirm',
      success: '/pages/place/create/success'
    },
    update: {
      confirm: '/pages/place/an-id/edit/confirm',
      success: '/pages/place/an-id/edit/success'
    },
    delete: {
      confirm: '/pages/place/an-id/delete/confirm',
      success: '/pages/place/an-id/delete/success'
    }
  },
  pil: {
    base: '/pages/pil',
    create: '/pages/pil/create',
    read: '/pages/pil/an-id',
    update: '/pages/pil/update',
    procedures: '/pages/pil/an-id/edit/procedures',
    training: {
      exempt: '/pages/pil/an-id/edit/training/exempt',
      certificate: '/pages/pil/an-id/edit/training',
      modules: '/pages/pil/an-id/edit/training/modules'
    },
    exemptions: {
      exempt: '/pages/pil/an-id/edit/exemptions',
      modules: '/pages/pil/an-id/edit/exemptions/modules'
    },
    success: '/pages/pil/an-id/edit/success'
  }
};
