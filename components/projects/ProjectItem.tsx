import toast from "react-hot-toast";
import useApi from "@/utils/useApi";
import Item from "@/components/Home/Item";

const ProjectItem = ({ design, type, index }) => {
  const { fetchData, data, error } = useApi(`api/v1/design/delete-user-image/${design?.id}`, 'DELETE');
  const deleteDesign = async (id) => {
    try {
      await fetchData({});
      // await api.delete(`/design/delete-user-image/${id}`);
      // setDesigns(designs.filter(design => design._id !== id));
      toast.success('Design deleted successfully');
      // getUserDesigns();
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }

  return (
    <>
      design._id !== designId &&
        <Item key={index} design={design} type={type} deleteDesign={deleteDesign} />
    </>
  )
}

export default ProjectItem;