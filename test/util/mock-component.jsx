export const MockComponent = (name) => ({...props}) =>
  `${name}${props && Object.keys(props).length > 0 ? ` (props: ${JSON.stringify(props)})` : ''}`;
