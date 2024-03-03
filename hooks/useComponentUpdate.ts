// export const useComponentUpdate = (currentComponent, setComponents, components, setImage) => {
//   const removeBackground = () => {
//     const component = components.find(component => component.id === currentComponent.id);
//     const temp = components.filter(component => component.id !== currentComponent.id);
//     component.image = '';
//     setImage('');
//     setComponents([...temp, component]);
//   }
//
//   return {
//     removeBackground
//   }
// }