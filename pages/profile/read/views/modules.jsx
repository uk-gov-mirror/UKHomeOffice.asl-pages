import React from 'react';
import { Snippet } from '@ukhomeoffice/asl-components';
import { dateFormat } from '../../../../constants';
import { formatDate } from '../../../../lib/utils';

const Modules = ({certificates}) => {
  return certificates.map((certificate, index) => (
    <div key={index}>
      <h3><Snippet>pil.training.certificate.details</Snippet></h3>
      <p><Snippet>pil.training.certificate.number</Snippet><span>:</span> {certificate.certificateNumber}</p>
      <p><Snippet>pil.training.certificate.awarded</Snippet><span>:</span> {formatDate(certificate.passDate, dateFormat.short)}</p>
      <p><Snippet>pil.training.certificate.body</Snippet><span>:</span> {certificate.accreditingBody === 'Other' ? certificate.otherAccreditingBody : certificate.accreditingBody}</p>

      <h3><Snippet>pil.training.modules</Snippet></h3>
      <ul>
        {
          certificate.modules.map((module, index) => (
            <li key={index}>{module.module}</li>
          ))
        }
      </ul>
      <h3><Snippet>pil.training.species</Snippet></h3>
      {
        certificate.species && !!certificate.species.length
          ? (
            <ul>
              {
                certificate.species.map((s, index) => (
                  <li key={index}>{s}</li>
                ))
              }
            </ul>
          )
          : (
            <p><em><Snippet>pil.species.none</Snippet></em></p>
          )
      }
    </div>
  ));
};

export default Modules;
