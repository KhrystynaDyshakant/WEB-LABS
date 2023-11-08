import React from "react";
import HomeImgFlowers from "../../icons/HomeImg.jpg";
import WhieFlowersImg from "../../icons/white_bouquet.jpg";
import BagFlowers from "../../icons/bag_flowers.jpg";
import WhiteRoses from "../../icons/white_roses.jpg";
import { HomeWrapper, DesctriptionWrapper, CardsWrapper, ButtonWrapper } from "./Home.styled";
import CardItem from "../../components/CardItem/CardItem";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const data = [
    {
        title: "Sophie and Sharman bouquet of cream roses",
        text: "Sophie and Sharman is a charming bouquet of cream roses that symbolize tenderness and elegance. This bouquet is an ideal gift for those you love and respect.",
        image: WhieFlowersImg,
        price: 850,
    },
    {
        title: "Basket of white eustomas",
        text:"A basket of white eustomas is a symbol of purity and elegance. These delicate and pristine flowers have a charm of their own. With their crisp white petals and soft fragrance.",
        image: BagFlowers,
        price: 3000,
    },
    {
        title: 'A bouquet of 29 White Ohara white roses',
        text: "A bouquet of 29 White Ohara white roses is a stunning and sophisticated gift. Each White Ohara rose is a symbol of purity and timeless beauty.",
        image: WhiteRoses,
        price: 2400,
    },
];

function Home() {
    return (
        <HomeWrapper>
            <DesctriptionWrapper>
                <img src={HomeImgFlowers} alt="" width="540" height="540"/>
                <div>
                    <h2>What about us</h2>
                    <p>In our flower shop, you will find a magical story that reflects our vocation and passion for flowers, as well as our commitment to your needs and desire to make your special moments extraordinary.
                    Our mission is to bring beauty and joy to your life and the lives of your loved ones. We have opened for you the world of flowers, where each bouquet is a part of our story that we want to share with you. We are always here to make your special moments even more special.
</p>
                </div>
            </DesctriptionWrapper>
            <h2>Hot offer</h2>
            <CardsWrapper>
                {data.map(({ title, text, image, price }, idx) => (
                    <CardItem
                        title={title}
                        text={text}
                        imageSrc={image}
                        price={price}
                        id={idx}
                    />
                ))}
            </CardsWrapper>
            <ButtonWrapper>
            <PrimaryButton styles={{}} onClick={(e) => {}} size="large"><Link to="/catalog">View more</Link></PrimaryButton>
            </ButtonWrapper>
        </HomeWrapper>
    );
}

export default Home;