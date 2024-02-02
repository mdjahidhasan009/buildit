const createComponentFactory = (setCurrentComponent, moveElement, resizeElement, rotateElement) => {
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
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
      ...additionalProps,
    };
  };
};

export default createComponentFactory;