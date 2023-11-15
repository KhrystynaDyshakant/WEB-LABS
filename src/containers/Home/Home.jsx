import React, { useContext, useState} from "react";
import HomeImgFlowers from "../../icons/HomeImg.jpg";
// import WhieFlowersImg from "../../icons/white_bouquet.jpg";
// import BagFlowers from "../../icons/bag_flowers.jpg";
// import WhiteRoses from "../../icons/white_roses.jpg";
import { HomeWrapper, DesctriptionWrapper, CardsWrapper, ButtonWrapper } from "./Home.styled";
import CardItem from "../../components/CardItem/CardItem";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { ItemContext } from "../../context/Items";
// const data = [
//     {
//         title: "Sophie and Sharman bouquet of cream roses",
//         text: "Sophie and Sharman is a charming bouquet of cream roses that symbolize tenderness and elegance. This bouquet is an ideal gift for those you love and respect.",
//         image: WhieFlowersImg,
//         price: 850,
//     },
//     {
//         title: "Basket of white eustomas",
//         text:"A basket of white eustomas is a symbol of purity and elegance. These delicate and pristine flowers have a charm of their own. With their crisp white petals and soft fragrance.",
//         image: BagFlowers,
//         price: 3000,
//     },
//     {
//         title: 'A bouquet of 29 White Ohara white roses',
//         text: "A bouquet of 29 White Ohara white roses is a stunning and sophisticated gift. Each White Ohara rose is a symbol of purity and timeless beauty.",
//         image: WhiteRoses,
//         price: 2400,
//     },
// ];
let currentItemCount = 3;

function Home() {
    const data = useContext(ItemContext);
    const [itemsToDisplay, setItemsToDisplay] = useState(data
        .slice(0, currentItemCount));
        const [buttonLabel, setButtonLabel] = useState("View more")

    const showMore = (e) => {
        e.preventDefault();
        if (currentItemCount < data.length){
            currentItemCount += 3;
        } else {
            currentItemCount = 3;
        }
        console.log(currentItemCount);
        setItemsToDisplay(data
                        .slice(0, currentItemCount));
        if (currentItemCount >= data.length) {
            setButtonLabel("Turn Back");
        } else {
            setButtonLabel("View more");
        }
    }

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
                {itemsToDisplay.map(({ title, text, image, price, id }) => (
                    <CardItem
                        title={title}
                        text={text}
                        imageSrc={image}
                        price={price}
                        id={id}
                        key={id}
                    />
                ))}
            </CardsWrapper>
            <ButtonWrapper>
            <PrimaryButton onClick={showMore} size="large">{ buttonLabel }</PrimaryButton>
            </ButtonWrapper>
        </HomeWrapper>
    );
}

export default Home;