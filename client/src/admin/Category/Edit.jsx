
import Category from "../Components/Admin/CategoryCom";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();

    return <>
        <Category title={'Edit Category'} state={'Update'} id={id} />
    </>
}

export default Edit;