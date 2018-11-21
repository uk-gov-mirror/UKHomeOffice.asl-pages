module.exports = {
  pil: {
    submitted: {
      title: 'Application submitted to NTCO',
      summary: `A confirmation email has been sent to

      {{email}}`,
      whatNext: {
        title: 'What happens next?',
        summary: `**You are not licenced to carry out any new procedures until your licence application has been approved
          by ASRU**`
      },
      body: `The Training and Competency Officer at your establishment is responsible for endorsing your training and
        exemptions. They may contact you to ask for more information.

        Exemptions may also be assessed by an inspector.`,
      homepage: 'Homepage'
    }
  },
  states: {
    submitted: 'Submitted',
    endorsed: 'Endorsed',
    granted: 'Licence granted'
  }
};
