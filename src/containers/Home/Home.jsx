import React, { useState, useEffect } from "react";
import HomeImgFlowers from "../../icons/HomeImg.jpg";
import { HomeWrapper, DesctriptionWrapper, CardsWrapper, ButtonWrapper } from "./Home.styled";
import CardItem from "../../components/CardItem/CardItem";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { getFlowers } from "../../API/api";

function Home() {
    const [flowers, setFlowers] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("View more");

    useEffect(() => {
        showMore(null, 3);
    }, [])

    const showMore = (e, primaryLimit) => {
        getFlowers({current: primaryLimit}, (resp) => {
            setFlowers(resp.flowers);
            if (resp.more) {
                setButtonLabel("View more");
            } else {
                setButtonLabel("Turn back");
            }
        }, "/recomend");
    }

    const homePageContent = {
        title: 'What about us',
        text: 'In our flower shop, you will find a magical story that reflects our vocation and passion for flowers, as well as our commitment to your needs and desire to make your special moments extraordinary.Our mission is to bring beauty and joy to your life and the lives of your loved ones. We have opened for you the world of flowers, where each bouquet is a part of our story that we want to share with you. We are always here to make your special moments even more special.'
    }


    return (
        <HomeWrapper>
            <DesctriptionWrapper>
                <img src={HomeImgFlowers} alt="" />
                <div>
                    <h2>{homePageContent.title}</h2>
                    <p>{homePageContent.text}</p>
                </div>
            </DesctriptionWrapper>
            <h2>Hot offer</h2>
            <CardsWrapper>
                {flowers.map(({ title, text, image, price, id }, idx) => (
                    <CardItem
                        title={title}
                        text={text}
                        imageName={image}
                        price={price}
                        id={id}
                        key={id}
                    />
                ))}
            </CardsWrapper>
            <ButtonWrapper>
                <PrimaryButton onClick={showMore} size="large">{buttonLabel}</PrimaryButton>
            </ButtonWrapper>
        </HomeWrapper>
    );
}

export default Home;
