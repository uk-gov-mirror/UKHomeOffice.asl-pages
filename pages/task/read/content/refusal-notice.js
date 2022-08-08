const intro = `
  {{noticeDate}}

  Dear {{licenceHolderName}}

  ### NOTICE OF INTENTION TO REFUSE A LICENCE UNDER ASPA 1986

  Application title: {{projectTitle}}
`;

const intent = `
  On behalf of the Secretary of State, I am providing notice of intent to refuse your application as required by
  [Section 12(1) of the the Animals (Scientific Procedures) Act 1986](https://www.legislation.gov.uk/ukpga/1986/14/section/12#section-12-1)
  following evaluation under [section 5B of the Act](https://www.legislation.gov.uk/ukpga/1986/14/section/5B) an
  inspector appointed under [Section 18(1)](https://www.legislation.gov.uk/ukpga/1986/14/section/18#section-18-1)
  and in accordance with their duty under
  [Section 18(2[a]) of the Act](https://www.legislation.gov.uk/ukpga/1986/14/section/18#section-18-2).

  It is proposed to refuse your licence application for the following reasons below:
`;

const representations = `
  Under [Section 12(3) of the Act](https://www.legislation.gov.uk//ukpga/1986/14/section/12#section-12-3), you have
  the right to make representations in writing or in person against the Secretary of State's proposal to refuse your
  application for a licence. Should you wish to make representations to a person appointed by the Secretary of State,
  you must respond to this notice by {{respondByDate}}. You may give notice of your intention to make representations
  by contacting your SPoC or emailing [aspa.london@homeoffice.gov.uk](mailto:aspa.london@homeoffice.gov.uk).
`;

const outro = `
  Please refer to
  [Appendix E of the Guidance on the Operation of the Act](https://www.gov.uk/guidance/guidance-on-the-operation-of-the-animals-scientific-procedures-act-1986)
  for details on the process of making representations.

  Yours sincerely,

  {{inspectorName}}
`;

const full = `
  ${intro}

  ${intent}

  > {{refusalReason}}

  ${representations}

  ${outro}
`;

module.exports = {
  intro,
  intent,
  representations,
  outro,
  full
};
