module.exports = {
  pel: {
    amendment: {
      resubmitted: {
        title: 'Amendment submitted',
        body: `An inspector will review your changes and contact you if they need any more information.

          You will be notified by the Home Office when your changes are approved or rejected.`
      },
      updated: {
        title: 'Amendment submitted',
        body: `An inspector will review your changes and contact you if they need any more information.

          You will be notified by the Home Office when your changes are approved or rejected.`
      },
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      'returned-to-applicant': {
        title: 'Amendment returned',
        body: `The person who submitted the amendment will review your comments.

          They can then choose to discard the amendment, or make changes based on your comments.`
      },
      resolved: {
        title: 'Amendment approved',
        body: 'The Establishment Licence has been updated with the changes approved in this amendment.'
      },
      rejected: {
        title: 'Amendment rejected',
        body: `The person who submitted this amendment will review your comments and the reason for rejecting it.

          They will need to create a new amendment if they wish to submit these changes again.`
      },
      'withdrawn-by-applicant': {
        title: 'Amendment withdrawn',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Amendment recalled',
        body: 'You can now edit this amendment and resubmit it, or discard it and start again.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Amendment discarded',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      }
    }
  },
  pil: {
    revocation: {
      resubmitted: {
        title: 'Revocation submitted',
        body: `A licensing officer will review your request to revoke this licence and contact you if they need any more information.`
      },
      resolved: {
        title: 'Licence revoked',
        body: 'This licence is no longer active. The person who held this licence is no longer authorised to carry out any regulated procedures in any categories.'
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Revocation recalled',
        body: 'You can now edit this revocation request and resubmit it, or discard it.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Revocation discarded',
        body: 'You will need to create a new request if you want to revoke this licence in the future.'
      }
    },
    application: {
      resubmitted: {
        title: 'Application submitted',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The Training and Competency Officer at your establishment will review the training and exemption information.

          They may contact you for more information before they endorse an application.

          Exemptions may also be assessed by an inspector.`
      },
      // TODO: CONTENT
      updated: {
        title: 'Application submitted',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The Training and Competency Officer at your establishment will review the training and exemption information.

          They may contact you for more information before they endorse an application.

          Exemptions may also be assessed by an inspector.`
      },
      // TODO: remove, left for b/c
      'ntco-endorsed': {
        title: 'Application endorsed',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The Home Office will review this application and your endorsement, and may consult with an Inspector if required.

          They will contact you if they need any more information.`
      },
      endorsed: {
        title: 'Application endorsed',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The Home Office will review this application and your endorsement, and may consult with an Inspector if required.

          They will contact you if they need any more information.`
      },
      'returned-to-applicant': {
        title: 'Application returned',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The person who submitted this application will review your comments.

          They can then choose to discard the application, or make changes based on your comments.`
      },
      'referred-to-inspector': {
        title: 'Application referred',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          An Inspector will review this application and will contact you if they need any more information.`
      },
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: `An applicant is not licensed to carry out any new or additional procedures mentioned in this application or amendment until it has been granted or approved by the Home Office.

          A Licensing Officer will review your recommendation and will contact you if they need any more information.`
      },
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: `An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.

          A Licensing Officer will review your recommendation and will contact you if they need any more information.`
      },
      resolved: {
        title: 'Licence granted',
        body: 'The applicant now holds a personal licence that authorises them to carry out the procedures detailed in their application.'
      },
      rejected: {
        title: 'Application rejected',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The applicant will review your comments and the reason for rejecting their licence application.

          They will need to create a new application if they wish to apply for this type of licence in the future.`
      },
      'withdrawn-by-applicant': {
        title: 'Application withdrawn',
        body: 'The application will revert to a draft that can be opened from the applicant\'s profile page.'
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Application recalled',
        body: 'You can now edit this application and resubmit it, or discard it and start again.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Application discarded',
        body: 'You will need to create a new application if you want to apply for this type of licence again.'
      }
    },
    amendment: {
      resubmitted: {
        title: 'Amendment submitted',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The Home Office will review your changes and will contact you if they need any more information.`
      },
      // TODO: CONTENT
      updated: {
        title: 'Amendment submitted',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The Home Office will review your changes and will contact you if they need any more information.`
      },
      // TODO: remove, left for b/c
      'ntco-endorsed': {
        title: 'Amendment endorsed',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The Home Office will review this amendment and your endorsement, and may consult with an Inspector if required.

          They will contact you if they need any more information.`
      },
      endorsed: {
        title: 'Amendment endorsed',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The Home Office will review this amendment and your endorsement, and may consult with an Inspector if required.

          They will contact you if they need any more information.`
      },
      'returned-to-applicant': {
        title: 'Amendment returned',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The person who submitted this amendment will review your comments.

          They can then choose to discard the amendment, or make changes based on your comments.`
      },
      'referred-to-inspector': {
        title: 'Amendment referred',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          An Inspector will review this amendment and will contact you if they need any more information.`
      },
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          A Licensing Officer will review your recommendation and will contact you if they need any more information.`
      },
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          A Licensing Officer will review your recommendation and will contact you if they need any more information.`
      },
      resolved: {
        title: 'Amendment approved',
        body: 'The applicant now holds a personal licence that authorises them to carry out the procedures detailed in their amendment.'
      },
      rejected: {
        title: 'Amendment rejected',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The person who submitted this amendment will review your comments and the reason for rejecting it.

          They will need to create a new amendment if they wish to submit these changes again.`
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Amendment recalled',
        body: 'You can now edit this amendment and resubmit it, or discard it and start again.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Amendment discarded',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      }
    }
  },
  project: {
    application: {
      licenceHolderUpdated: {
        title: 'Applicant updated',
        body: 'The applicant has been updated on this draft application.'
      },
      resubmitted: {
        title: 'Application sent',
        body: `An inspector will review your application. You will be able to see any comments that they have added once an application is returned to you.

          You will be notified when an inspector has made a recommendation to the Home Office about your application.`
      },
      // TODO: content
      'awaiting-endorsement': {
        title: 'Application sent',
        body: `An administrator at your establishment will review this application.

          They may contact you for more information before they endorse an application.`
      },
      // TODO: content
      endorsed: {
        title: 'Application endorsed',
        body: `An inspector will review this application. You will be able to see any comments that they have added once an application is returned to you.

          You will be notified when an inspector has made a recommendation to the Home Office about this application.`
      },
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'

      },
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      'returned-to-applicant': {
        title: 'Application returned',
        body: `The applicant will review your comments and address any changes that need to be made.

          They can then choose to discard the amendment, or submit it again.`
      },
      resolved: {
        title: 'Licence granted',
        body: 'The applicant now holds a project licence that authorises them to carry out the programme of work as detailed in their application.'
      },
      rejected: {
        title: 'Application rejected',
        body: `The applicant will review your comments and the reason for rejecting it.

          They will need to create a new application if they wish to apply for this type of licence in the future.`
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Application recalled',
        body: 'You can now edit this application and resubmit it, or discard it and start again.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Application discarded',
        body: 'You will need to create a new application if you want to apply for this type of licence again.'
      }
    },
    amendment: {
      resubmitted: {
        title: 'Amendment submitted',
        body: `An inspector will review your changes and contact you if they need any more information.

          You will be notified by the Home Office when your changes are approved or rejected.`
      },
      // TODO: content
      'awaiting-endorsement': {
        title: 'Amendment submitted',
        body: `An administrator at your establishment will review this amendment.

          They may contact you for more information before they endorse an amendment.`
      },
      // TODO: content
      endorsed: {
        title: 'Amendment endorsed',
        body: `An inspector will review these changes and contact you if they need any more information.

          The applicant will be notified by the Home Office when these changes are approved or rejected.`
      },
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      'returned-to-applicant': {
        title: 'Amendment returned',
        body: `The person who submitted the amendment will review your comments.

          They can then choose to discard the amendment, or make changes based on your comments.`
      },
      resolved: {
        title: 'Amendment approved',
        body: 'The applicant now holds a project licence that authorises them to carry out the programme of work as detailed in their amendment.'
      },
      rejected: {
        title: 'Amendment rejected',
        body: `The person who submitted this amendment will review your comments and the reason for rejecting it.

          They will need to create a new amendment if they wish to submit these changes again.`
      },
      'withdrawn-by-applicant': {
        title: 'Amendment withdrawn',
        body: `The amendment will revert to a draft that can be opened from the applicant's profile page.

        Any comments that an inspector may have added to this amendment have been deleted.`
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Amendment recalled',
        body: 'You can now edit this amendment and resubmit it, or discard it and start again.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Amendment discarded',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      },
      updated: {
        title: 'Amendment submitted',
        body: `An inspector will review your changes and contact you if they need any more information.

          You will be notified by the Home Office when your changes are approved or rejected.`
      }
    },
    revocation: {
      resubmitted: {
        title: 'Revocation submitted',
        body: 'An inspector will review your request to revoke this licence and contact you if they need any more information.'
      },
      'inspector-recommended': {
        title: 'Revocation submitted',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      resolved: {
        title: 'Licence revoked',
        body: 'This licence is no longer active. The person who held this licence is no longer authorised to carry out any regulated procedures in any categories.'
      },
      'recalled-by-applicant': {
        title: 'Revocation recalled',
        body: 'You can now edit this revocation request and resubmit it, or discard it.'
      },
      'discarded-by-applicant': {
        title: 'Revocation discarded',
        body: 'You will need to create a new revocation if you want to submit these changes again.'
      }
    }
  },
  profile: {
    amendment: {
      // TODO: CONTENT
      resubmitted: {
        title: 'Amendment submitted',
        body: `An inspector will review your changes and contact you if they need any more information.

          You will be notified by the Home Office when your changes are approved or rejected.`
      },
      // TODO: CONTENT
      updated: {
        title: 'Amendment submitted',
        body: `An inspector will review your changes and contact you if they need any more information.

          You will be notified by the Home Office when your changes are approved or rejected.`
      },
      // TODO: CONTENT
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      // TODO: CONTENT
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: 'A Licensing Officer will review your recommendation and contact you if they need any more information.'
      },
      // TODO: CONTENT
      'returned-to-applicant': {
        title: 'Amendment returned',
        body: `The person who submitted the amendment will review your comments.

          They can then choose to discard the amendment, or make changes based on your comments.`
      },
      // TODO: CONTENT
      resolved: {
        title: 'Amendment approved',
        body: 'The profile has been updated with the changes approved in this amendment.'
      },
      // TODO: CONTENT
      rejected: {
        title: 'Amendment rejected',
        body: `The person who submitted this amendment will review your comments and the reason for rejecting it.

          They will need to create a new amendment if they wish to submit these changes again.`
      },
      // TODO: CONTENT
      'withdrawn-by-applicant': {
        title: 'Amendment withdrawn',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      },
      // TODO: CONTENT
      'recalled-by-applicant': {
        title: 'Amendment recalled',
        body: 'You can now edit this application and resubmit it, or discard it and start again.'
      },
      // TODO: CONTENT
      'discarded-by-applicant': {
        title: 'Amendment discarded',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      }
    }
  },
  fallback: {
    title: 'Task updated',
    body: 'You have successfully updated the status of this task.'
  }
};
