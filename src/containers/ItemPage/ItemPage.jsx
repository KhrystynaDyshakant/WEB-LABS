import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { InputNumber } from 'antd';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CategoryWrapper, Description, DescriptionContainer, ItemContainer, SubmitContainer, Title } from "./ItemPage.styled";
import { getFlowers } from "../../API/api";
import DownloadImage from "../../components/Image/DownloadImage";

const ItemPage = () => {
    const { flowersId } = useParams();

    const [currentFlowers, setCurrentFlowers] = useState({});

    useEffect(() => {
        getFlowers({id: flowersId}, (resp) => setCurrentFlowers(resp.flowers));
    }, [flowersId])

    return (
        <div>
            { currentFlowers ?
            <div>
                <Title>{currentFlowers.title}</Title>
                <ItemContainer>
                    <DownloadImage imageName={currentFlowers.image} />
                    <div>
                        <CategoryWrapper>
                            <Link to="#">{currentFlowers.category}</Link>
                        </CategoryWrapper>
                        <SubmitContainer>
                            <h3>{currentFlowers.price} UAH</h3>
                            <div>
                                {!currentFlowers.quantity ? true : false && <p>Item is not available</p>}
                                <InputNumber disabled={!currentFlowers.quantity ? true : false} min={1} max={currentFlowers.quantity} defaultValue={1} />
                                <Link to="/cart">
                                    <PrimaryButton disabled={!currentFlowers.quantity ? true : false}>Add to cart</PrimaryButton>
                                </Link>
                            </div>
                            <br />
                        </SubmitContainer>
                    </div>
                </ItemContainer>
                <DescriptionContainer>
                    <h2>About flowers</h2>
                    <Description>{currentFlowers.text}</Description>
                </DescriptionContainer>
            </div> :
            <div>Problem!!!</div> }
        </div>
    )
};

export default ItemPage;