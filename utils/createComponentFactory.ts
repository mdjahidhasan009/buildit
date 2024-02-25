const createComponentFactory = () => {
  return ({ name, type, additionalProps = {} }) => {
    return {
      id: Date.now(),
      name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate: 0,
      zIndex: 2,
      color: '#3c3c3d',
      ...additionalProps,
    };
  };
};

export default createComponentFactory;