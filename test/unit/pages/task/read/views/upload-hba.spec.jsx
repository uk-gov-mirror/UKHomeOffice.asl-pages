import React from 'react';
import {render} from 'enzyme';
import {Snippet} from '@ukhomeoffice/asl-components/src/snippet';

describe('HBA Upload intro', () => {

  const content = {
    intro: `To {{action}} the licence you must upload the PPL assessment form containing the harm benefit analysis (HBA) for this {{type}}.

  The HBA will be visible to ASRU only.`
  };

  test('Amend intro wording', () => {
    const wrapper = render(
      <div>
        <Snippet content={content} action='amend' type='amendment'>intro</Snippet>
      </div>
    );

    const paragraphs = wrapper.find('p');
    expect(paragraphs.length).toEqual(2);
    expect(paragraphs[0].children[0].data).toEqual(
      'To amend the licence you must upload the PPL assessment form containing the harm benefit analysis (HBA) for this amendment.');
    expect(paragraphs[1].children[0].data).toEqual(
      'The HBA will be visible to ASRU only.');
  });

  test('Grant intro wording', () => {
    const wrapper = render(
      <div>
        <Snippet content={content} action='grant' type='application'>intro</Snippet>
      </div>
    );

    const paragraphs = wrapper.find('p');
    expect(paragraphs.length).toEqual(2);
    expect(paragraphs[0].children[0].data).toEqual(
      'To grant the licence you must upload the PPL assessment form containing the harm benefit analysis (HBA) for this application.');
    expect(paragraphs[1].children[0].data).toEqual(
      'The HBA will be visible to ASRU only.');
  });

  test('Mustache framework append Transfer into content', () => {
    const wrapper = render(
      <div>
        <Snippet content={content} action='transfer' type='transfer'>intro</Snippet>
      </div>
    );

    const paragraphs = wrapper.find('p');
    expect(paragraphs.length).toEqual(2);
    expect(paragraphs[0].children[0].data).toEqual(
      'To transfer the licence you must upload the PPL assessment form containing the harm benefit analysis (HBA) for this transfer.');
    expect(paragraphs[1].children[0].data).toEqual(
      'The HBA will be visible to ASRU only.');
  });
});
