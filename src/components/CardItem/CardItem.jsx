import React from "react";
import { Card } from "antd";
import { Footer, CatdItemWrapper } from "./CardItem.styled";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const CardItem = ({ title = 'No title.', text, imageSrc, price, id }) => {

    const navigate = useNavigate();

    return(
    <CatdItemWrapper>
        <Card
            hoverable
            style={{ width: 350, borderRadius: "20px" }}
            cover={
                <img style={{ borderRadius: "20px" }} alt="example" src={imageSrc} />
            }
        >
            <Meta title={title} description={text}/>
            <Footer>
                <p>{price} UAH </p>
                <PrimaryButton onClick={() => navigate(`/item/${id}`)}>Show More</PrimaryButton>
            </Footer>
        </Card>
    </CatdItemWrapper>
);
        };
        
export default CardItem;