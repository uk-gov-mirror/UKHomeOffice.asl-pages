import {getAdditionalEstablishments} from '../../../../../pages/project-version/helpers/project';

describe('Project Helper', () => {

  describe('getAdditionalEstablishments', () => {

    const ACTIVE_PROJECT_ESTABLISHMENT = {
      id: 8201,
      name: 'Active Establishment',
      status: 'active',
      versionId: null,
      issueDate: '2023-01-19T16:25:12.715Z',
      revokedDate: null,
      suspendedDate: null
    };

    const REMOVED_PROJECT_ESTABLISHMENT = {
      id: 8202,
      name: 'Revoked Project Establishment',
      status: 'removed',
      versionId: null,
      issueDate: '2021-01-19T16:25:12.715Z',
      revokedDate: '2022-01-19T16:25:12.715Z',
      suspendedDate: null
    };

    const PROJECT_ESTABLISHMENT_TO_DELETE = {
      id: 8203,
      name: 'Active Establishment',
      status: 'active',
      versionId: null,
      issueDate: '2023-01-19T16:25:12.715Z',
      revokedDate: null,
      suspendedDate: null
    };

    const PROPOSED_DELETE_ESTABLISHMENT = {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Marvell Pharmaceutical',
      deleted: true,
      'establishment-id': 8203
    };

    const PROPOSED_ESTABLISHMENT = {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Proposed Establishment',
      'establishment-id': 8204
    };

    it('returns additional establishments', () => {
      const version = {
        data: {
          'other-establishments': true,
          establishments: [
            PROPOSED_DELETE_ESTABLISHMENT,
            PROPOSED_ESTABLISHMENT
          ]
        }
      };

      const project = {
        additionalEstablishments: [
          ACTIVE_PROJECT_ESTABLISHMENT,
          REMOVED_PROJECT_ESTABLISHMENT,
          PROJECT_ESTABLISHMENT_TO_DELETE
        ]
      };

      const result = getAdditionalEstablishments(project, version);

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({id: 8201, name: 'Active Establishment'}),
          expect.objectContaining({'establishment-id': 8204, name: 'Proposed Establishment'})
        ])
      );
    });

    it('doesn\'t include additional establishments from the version if other-establishements is false', () => {
      const version = {
        data: {
          'other-establishments': false,
          establishments: [
            PROPOSED_ESTABLISHMENT
          ]
        }
      };

      const project = {
        additionalEstablishments: [
          ACTIVE_PROJECT_ESTABLISHMENT
        ]
      };

      const result = getAdditionalEstablishments(project, version);

      expect(result).toHaveLength(1);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({id: 8201, name: 'Active Establishment'})
        ])
      );
    });

    it('includes additional establishments from the version if other-establishements is true', () => {
      const version = {
        data: {
          'other-establishments': true,
          establishments: [
            PROPOSED_ESTABLISHMENT
          ]
        }
      };

      const project = {
        additionalEstablishments: [
          ACTIVE_PROJECT_ESTABLISHMENT
        ]
      };

      const result = getAdditionalEstablishments(project, version);

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({id: 8201, name: 'Active Establishment'}),
          expect.objectContaining({'establishment-id': 8204, name: 'Proposed Establishment'})
        ])
      );
    });
  });
});
