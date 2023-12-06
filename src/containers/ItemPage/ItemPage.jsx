import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from 'react-router-dom';
import { InputNumber } from 'antd';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CategoryWrapper, Description, DescriptionContainer, ItemContainer, SubmitContainer, Title } from "./ItemPage.styled";
import { getFlowersBackend } from "../../API/api";
import DownloadImage from "../../components/Image/DownloadImage";
import { useDispatch } from "react-redux";
import { addFlowers} from "../../Redux/actions";

const ItemPage = () => {
    const { flowersId } = useParams();

    const [currentFlowers, setCurrentFlowers] = useState({});

    const dispatch = useDispatch();

    const inputRef = useRef();

    const addFlowersWithInput = () => {
        if (inputRef.current) {
          const inputValue = parseInt(inputRef.current.value);
          dispatch(addFlowers(currentFlowers, inputValue));
        }
    };

    useEffect(() => {
        const fetchFlowersBackend = async () => {
            try {
                const response = await getFlowersBackend(flowersId);
                setCurrentFlowers(response);
            } catch (error) {
                console.error("Error fetching flowers backend:", error);
            }
        };

        fetchFlowersBackend();
    }, [flowersId]);

    // useEffect(() => {
    //     getFlowers({id: flowersId}, (resp) => setCurrentFlowers(resp.flowers));
    // }, [flowersId])

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
                                <InputNumber disabled={!currentFlowers.quantity ? true : false} min={1} max={currentFlowers.quantity} defaultValue={1} ref={inputRef} />
                                <Link to="/cart">
                                    <PrimaryButton disabled={!currentFlowers.quantity ? true : false} onClick={addFlowersWithInput}>Add to cart</PrimaryButton>
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