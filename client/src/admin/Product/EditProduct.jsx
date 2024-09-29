import ProductCom from "../Components/Admin/ProductCom"
import { useParams } from 'react-router-dom'

const EditProduct = () => {
    const { id } = useParams();

    return (
        <div>
            <ProductCom title={'Edit Product'} state={'Update'} id={id} />
        </div>
    )
}

export default EditProduct