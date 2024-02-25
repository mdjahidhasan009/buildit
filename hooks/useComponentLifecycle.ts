export const useComponentLifecycle = (setCurrentComponent, components, setComponents) => {
  const removeComponent = (id: string) => {
    const temp = components.filter(component => component.id !== id);
    setComponents(temp);
    setCurrentComponent('')
  }

  return {
    removeComponent
  }
}