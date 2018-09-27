const modulesToCertificates = require('../../../../lib/utils/modules-to-certificates');

const modulesWithSameCert = [
  {
    id: '9672fe61-2c65-4207-bfd9-b3d2e81cc440',
    migrated_id: null,
    module: 'L',
    species: null,
    pass_date: null,
    not_applicable: false,
    accrediting_body: 'Society of Biology',
    other_accrediting_body: null,
    certificate_number: 'qwerty',
    exemption: false,
    exemption_description: null,
    created_at: '2018-09-26T10:53:19.884Z',
    updated_at: '2018-09-26T10:53:19.884Z',
    profileId: 'fb221cb9-f9df-4855-8069-b8c94f5901fa',
    deleted: null
  },
  {
    id: '56dcbd59-f197-4b76-835a-bd79f30fb72c',
    migrated_id: null,
    module: 'E1',
    species: null,
    pass_date: null,
    not_applicable: false,
    accrediting_body: 'Society of Biology',
    other_accrediting_body: null,
    certificate_number: 'qwerty',
    exemption: false,
    exemption_description: null,
    created_at: '2018-09-26T10:53:40.150Z',
    updated_at: '2018-09-26T10:53:40.150Z',
    profileId: 'fb221cb9-f9df-4855-8069-b8c94f5901fa',
    deleted: null
  }
];

const modulesWithDifferentCert = [
  {
    id: '67e3fda3-fb89-4a43-87c8-2babe44383c1',
    migrated_id: null,
    module: 'PILA (theory)',
    species: null,
    pass_date: null,
    not_applicable: false,
    accrediting_body: 'Universities Group',
    other_accrediting_body: null,
    certificate_number: 'asdf',
    exemption: false,
    exemption_description: null,
    created_at: '2018-09-26T10:54:19.296Z',
    updated_at: '2018-09-26T10:54:19.296Z',
    profileId: 'fb221cb9-f9df-4855-8069-b8c94f5901fa',
    deleted: null
  },
  {
    id: 'c688f58e-b8a5-475d-91b5-5f3f652af624',
    migrated_id: null,
    module: 'PILA (skills)',
    species: null,
    pass_date: null,
    not_applicable: false,
    accrediting_body: 'Universities Group',
    other_accrediting_body: null,
    certificate_number: 'zxcv',
    exemption: false,
    exemption_description: null,
    created_at: '2018-09-26T10:54:19.296Z',
    updated_at: '2018-09-26T10:54:19.296Z',
    profileId: 'fb221cb9-f9df-4855-8069-b8c94f5901fa',
    deleted: null
  }
];

describe('Modules to certificates', () => {
  it('combines modules with the same certificate details', () => {
    const certificates = modulesToCertificates(modulesWithSameCert);
    expect(certificates).toHaveLength(1);
    expect(certificates[0].modules).toEqual([
      { id: '9672fe61-2c65-4207-bfd9-b3d2e81cc440', name: 'L' },
      { id: '56dcbd59-f197-4b76-835a-bd79f30fb72c', name: 'E1' }
    ]);
  });

  it('does not combine modules with different certificate details', () => {
    const certificates = modulesToCertificates(modulesWithDifferentCert);
    expect(certificates).toHaveLength(2);
    expect(certificates[0].modules).toEqual([
      { id: '67e3fda3-fb89-4a43-87c8-2babe44383c1', name: 'PILA (theory)' }
    ]);
    expect(certificates[1].modules).toEqual([
      { id: 'c688f58e-b8a5-475d-91b5-5f3f652af624', name: 'PILA (skills)' }
    ]);
  });

  it('strips out module properties we don\'t need', () => {
    const certificates = modulesToCertificates(modulesWithSameCert);
    expect(certificates[0]).not.toHaveProperty('id');
    expect(certificates[0]).not.toHaveProperty('module');
    expect(certificates[0]).not.toHaveProperty('migrated_id');
    expect(certificates[0]).not.toHaveProperty('species');
    expect(certificates[0]).not.toHaveProperty('not_applicable');
    expect(certificates[0]).not.toHaveProperty('other_accrediting_body');
  });
});
