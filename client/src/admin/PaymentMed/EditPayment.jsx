import { useParams } from "react-router-dom"
import PaymentForm from "../Components/Admin/PaymentForm"

const EditPayment = () => {
    const { id } = useParams();
    return (
        <PaymentForm title={"Edit Payment"} id={id} state={'Update'} />
    )
}

export default EditPayment