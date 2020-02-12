module.exports = {
  pel: {
    application: {
      'with-inspectorate': {
        title: 'Application submitted',
        body: `An inspector will review your application and contact you if they need any more information.

          You will be notified by the Home Office when your application is approved or rejected.`
      }
    },
    amendment: {
      resubmitted: {
        licensing: {
          title: 'Licence updated',
          body: `The establishment licence has been amended.

            The establishment has been notified of this change.`
        },
        inspector: {
          title: 'Licence amendment submitted',
          body: `This amendment has been submitted to a licensing officer to process. They will be in touch if they need any more information.

            The establishment has been notified of this request, and will be notified once the licence has been updated.`
        },
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
      },
      'discarded-by-asru': {
        title: 'Amendment discarded',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      }
    },
    revocation: {
      resolved: {
        title: 'Licence revoked',
        body: 'This licence is not active. The establishment is not authorised to apply regulated procedures to protected animals, or to breed, supply, or keep protected animals in any approved area.'
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
      },
      'discarded-by-asru': {
        title: 'Revocation discarded',
        body: 'You will need to create a new request if you want to revoke this licence in the future.'
      }
    },
    application: {
      'awaiting-endorsement': {
        title: 'Application submitted',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this application until it has been granted by the Home Office.**

          The Training and Competency Officer at your establishment will review the training and exemption information.

          They may contact you for more information before they endorse an application.

          Exemptions may also be assessed by an inspector.`
      },
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
      },
      'discarded-by-asru': {
        title: 'Application discarded',
        body: 'You will need to create a new application if you want to apply for this type of licence again.'
      }
    },
    amendment: {
      'awaiting-endorsement': {
        title: 'Amendment submitted',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this amendment until it has been approved by the Home Office.**

          The Home Office will review your changes and will contact you if they need any more information.`
      },
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
      },
      'discarded-by-asru': {
        title: 'Amendment discarded',
        body: 'You will need to create a new amendment if you want to submit these changes again.'
      },
      'autoresolved': {
        title: 'Licence amended',
        body: `**This personal licence has been amended.**

          The licence holder has been notified of this change.`
      },
      'with-licensing': {
        title: 'Amendment submitted',
        body: `**This amendment has been submitted to a licensing officer to process. They will be in touch if they need any further information.**

          The licence holder has been notified of this request, and will be notified once the licence has been updated.`
      }
    },
    transfer: {
      'awaiting-endorsement': {
        title: 'Transfer request submitted',
        body: `An NTCO at the receiving establishment will review your transfer request and contact you if they need more information.

          NTCOs and administrators at the current establishment have also been notified.

          You will be notified by the Home Office when your transfer request is approved or rejected.`
      },
      resubmitted: {
        title: 'Transfer request submitted',
        body: `The Home Office will review your transfer request and will contact you if they need any more information.`
      },
      endorsed: {
        title: 'Transfer request endorsed',
        body: `The Home Office will review this personal licence transfer request and your endorsement, and may consult with an Inspector if required.

          They may contact you if they need any more information.`
      },
      'returned-to-applicant': {
        title: 'Transfer request returned',
        body: `The person who submitted this transfer request will review your comments.

          They can then choose to discard the transfer request, or make changes based on your comments.`
      },
      'referred-to-inspector': {
        title: 'Transfer request referred',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this transfer until it has been approved by the Home Office.**

          An Inspector will review this transfer request and will contact you if they need any more information.`
      },
      'inspector-recommended': {
        title: 'Recommendation sent',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this transfer request until it has been approved by the Home Office.**

          A Licensing Officer will review your recommendation and will contact you if they need any more information.`
      },
      'inspector-rejected': {
        title: 'Recommendation sent',
        body: `**An applicant is not licensed to carry out any new or additional procedures mentioned in this transfer request until it has been approved by the Home Office.**

          A Licensing Officer will review your recommendation and will contact you if they need any more information.`
      },
      resolved: {
        title: 'Transfer approved',
        body: `The personal licence has been approved and transferred.

          The establishment that was previously responsible for this licence will continue to have access to it until the licence holder is removed from that establishment.`
      },
      rejected: {
        title: 'Transfer rejected',
        body: `The person who submitted this transfer request will review your comments and the reason for rejecting it.

          They will need to create a new transfer request if they wish to submit these changes again.`
      },
      'recalled-by-applicant': {
        title: 'Transfer recalled',
        body: 'You can now edit this transfer request and resubmit it, or discard it and start again.'
      },
      'discarded-by-applicant': {
        title: 'Transfer discarded',
        body: 'You will need to create a new transfer request if you want to submit these changes again.'
      },
      'discarded-by-asru': {
        title: 'Transfer discarded',
        body: 'You will need to create a new transfer request if you want to submit these changes again.'
      },
      'autoresolved': {
        title: 'Licence amended',
        body: `**This personal licence has been amended.**

          The licence holder has been notified of this change.`
      },
      'with-licensing': {
        title: 'Transfer request submitted',
        body: `The Home Office will review your transfer request and will contact you if they need any more information.`
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
        title: 'Application submitted',
        body: `An inspector will review your application. You will be able to see any comments that they have added once an application is returned to you.

          You will be notified when an inspector has made a recommendation to the Home Office about your application.`
      },
      'with-inspectorate': {
        title: 'Application submitted',
        body: `An inspector will review your application. You will be able to see any comments that they have added once an application is returned to you.

          You will be notified when an inspector has made a recommendation to the Home Office about your application.`
      },
      // TODO: content
      'awaiting-endorsement': {
        title: 'Application submitted',
        body: `**The procedures applied for in this application cannot be carried out until the licence is granted.**

          An administrator, acting on behalf of the establishment's PEL holder, will review your application before it is submitted to the Home Office.`
      },
      // TODO: content
      endorsed: {
        title: 'Application endorsed',
        body: `**The procedures applied for in this application cannot be carried out until the licence is granted.**

          The Home Office will review this application and your endorsement. They will contact you or the applicant if they need any more information.`
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

          They can then choose to discard the application, or submit it again.`
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
      },
      'discarded-by-asru': {
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
      'with-inspectorate': {
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
      'discarded-by-asru': {
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
      },
      'discarded-by-asru': {
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
      'with-inspectorate': {
        title: 'Request sent',
        body: `Your changes need to be approved by the Home Office as you hold either a licence or a named role at an establishment.

        We'll contact you if we need more information. Otherwise you'll be emailed when your details have been updated.`
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
      },
      'discarded-by-asru': {
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
