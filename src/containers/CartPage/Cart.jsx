import { useDispatch, useSelector } from "react-redux";
import { CategoryWrapper, ItemContainer, SubmitContainer, Title, TotalPriceContainer, TotalPriceText, UAHText, StyledButton, ContinueCartButton} from "./Cart.styled";
import DownloadImage from "../../components/Image/DownloadImage";
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, deleteFlowers } from "../../Redux/actions";

const CartPage = () => {

    const flowers = useSelector((state) => state.flowers);
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (flowersState) => {
        if (flowersState.quantity < flowersState.flowers.quantity) {
            dispatch(increaseQuantity(flowersState.flowers.id));
        }
    }

    const handleDecreaseQuantity = (flowersState) => {
        if (flowersState.quantity > 1) {
            dispatch(decreaseQuantity(flowersState.flowers.id));
        } else {
            dispatch(deleteFlowers(flowersState.flowers.id));
        }
    }


    return (
        <div>
            <div style={{ margin: '0 auto' }}>
                {flowers.map((flowersState) => (
                    <div key={flowersState.flowers.id}>
                        <div>
                            <Title>
                                <Link to={`/item/${flowersState.flowers.id}`}>{flowersState.flowers.title}</Link>
                            </Title>
                            <ItemContainer>
                                <DownloadImage imageName={flowersState.flowers.image} />
                                <div>
                                    <CategoryWrapper>
                                        <Link to={`/item/${flowersState.flowers.id}`}>{flowersState.flowers.category}</Link>
                                    </CategoryWrapper>
                                    <SubmitContainer>
                                        <h3>{flowersState.flowers.price} UAH</h3>
                                        <div>
                                            <h3>{flowersState.quantity}</h3>
                                            <StyledButton onClick={() => handleIncreaseQuantity(flowersState)}>+</StyledButton>
                                            <h3>price: {flowersState.flowers.price * flowersState.quantity} UAH </h3>
                                            <StyledButton onClick={() => handleDecreaseQuantity(flowersState)}>-</StyledButton>
                                        </div>
                                        <br />
                                    </SubmitContainer>
                                </div>
                            </ItemContainer>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ margin: '60px auto' }}>
                <TotalPriceContainer>
                    <TotalPriceText>Total price: {
                        flowers.reduce((accumulator, flowersState) => {
                            return accumulator + flowersState.flowers.price * flowersState.quantity
                        }, 0)
                    }</TotalPriceText>
                    <UAHText>UAH</UAHText>
                </TotalPriceContainer>
                <Link to="/checkout">
                    <ContinueCartButton type="primary">Continue</ContinueCartButton>
                </Link>
            </div>
        </div>
    );
};

export default CartPage;