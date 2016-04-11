export const validate = value => {
  if (value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.length;
  }

  switch (typeof value) {
    case 'object':
      return value.isValid;
    default:
      return !!value;
  }
};

export const getProp =
  name =>
    prop => prop.key === name;

export const getProperty = (props, propName) =>
  props.find(prop => prop.key === propName);

export const toSwagger = props => (
  {
    swaggerify: () => (
      props.filter(prop => prop.isValid)
        .reduce((minimalInfo, prop) => {
          const minimal = minimalInfo;
          minimal[prop.key] = prop.value;
          return minimal;
        }, {})
    ),
  }
);

export const createIsValid = state => (
  {
    isValid() {
      const requiredPropsAreValid = state.props
        .filter(prop => prop.required)
        .every(prop => prop.isValid);

      const restAreValid = state.props
        .filter(prop => !prop.required && prop.value !== null)
        .every(prop => prop.isValid);

      return (requiredPropsAreValid && restAreValid);
    },
  }
);
