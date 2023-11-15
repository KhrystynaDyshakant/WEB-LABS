import React, { useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import { InputNumber} from 'antd';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CategoryWrapper, Description, DescriptionContainer, ItemContainer, SubmitContainer, Title } from "./ItemPage.styled";
import { ItemContext } from "../../context/Items";

const ItemPage = () => {
    const { itemId } = useParams();
    const data = useContext(ItemContext);
    let currentItem = null;
    for (const i of data) {
        if (i.id === itemId) {
            currentItem = i;
        }
    }

    if (currentItem == null) {
        return (<div>No items</div>)
    }

    const notAvailable = currentItem.quantity ? true: false;
    return (
        <div>
            <Title>{ currentItem.title }</Title>
            <ItemContainer>
                <img src={currentItem.image} alt="" />
                <div>
                    <CategoryWrapper>
                        <Link to="#">{ currentItem.category }</Link>
                    </CategoryWrapper>
                    <SubmitContainer>
                        <h3>{currentItem.price} UAH</h3>
                        <div>
                        { !notAvailable && <p>Item is not available</p> }
                            <InputNumber disabled={!notAvailable} min={1} max={currentItem.quantity} defaultValue={1} />
                            <PrimaryButton disabled={!notAvailable}>Add to cart</PrimaryButton>
                        </div>
                        <br />
                    </SubmitContainer>
                </div>
            </ItemContainer>
            <DescriptionContainer>
                <h2>About flowers</h2>
                <Description>{ currentItem.text }</Description>
            </DescriptionContainer>
        </div>
    )
};

export default ItemPage;