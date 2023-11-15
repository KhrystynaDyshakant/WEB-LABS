import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "../Home/Home";
import Catalog from "../Catalog/Catalog";
import Layout from "../App/Layout/Layout";
import ItemPage from "../ItemPage/ItemPage";
import { ItemContext } from "../../context/Items"

 const data = [
            {
                id: "1",
                title: "Sophie and Sharman bouquet of cream roses",
                text: "Sophie and Sharman is a charming bouquet of cream roses that symbolize tenderness and elegance. This bouquet is an ideal gift for those you love and respect.",
                image: require ("../../icons/white_bouquet.jpg"),
                price: 850,
                category: "roses",
                quantity: 0,
            },
            {
                id: "2",
                title: "Basket of white eustomas",
                text:"A basket of white eustomas is a symbol of purity and elegance. These delicate and pristine flowers have a charm of their own. With their crisp white petals and soft fragrance.",
                image: require ("../../icons/bag_flowers.jpg"),
                price: 3000,
                category: "basket",
                quantity: 10,
            },
            {
                id: "3",
                title: 'A bouquet of 29 White Ohara white roses',
                text: "A bouquet of 29 White Ohara white roses is a stunning and sophisticated gift. Each White Ohara rose is a symbol of purity and timeless beauty.",
                image: require ("../../icons/white_roses.jpg"),
                price: 2400,
                category: "roses",
                quantity: 8,
            },
            {
                id: "4",
                title: 'Bouquet of French roses Ohara and Pink Ohara',
                text:
                    "The bouquet of French roses Ohara and Pink Ohara was carefully arranged by an elderly florist named Marcel. He was known far and wide for his extraordinary ability to create.",
                image: require("../../icons/french_roses.jpg"),
                price: 1599,
                category: "roses",
                quantity: 12,
            },
            {
                id: "5",
                title: 'Basket with peony roses spray',
                text:
                    "In a cozy countryside cottage, nestled amidst rolling hills and blossoming meadows, there sat a wicker basket brimming with peony roses in full bloom.",
                image: require("../../icons/pink_basket.jpg"),
                price: 3350,
                category: "basket",
                quantity: 4,
            },
            {
                id: "6",
                title: 'Bouquet Aphrodite in a vase',
                text:
                    "Bouquet Aphrodite in a vase will beautify any interior.The bouquet includes: hydrangea, matiola, viburnum, genestra, limonium, imported rose, peony, calla.",
                image: require("../../icons/bouquet_vase_white.jpg"),
                price: 4620,
                category: "vase",
                quantity: 14,
            },
            {
                id: "7",
                title: 'Roses mistry bubbles in a vase',
                text:
                    "Misty Bubbles rose spray 15 stems in a vase will decorate any interior. Whether given as a gift or used to adorn a space, this bouquet conveys a sense of enchantment and timeless beauty.",
                image: require("../../icons/vase_pink.jpg"),
                price: 3500,
                category: "vase",
                quantity: 12,
            },
            {
                id: "8",
                title: 'Bouquet of flowers Virginia in a vase',
                text:
                    "The bouquet includes: tulip, lilac, eucalyptus, rose spray Misty Bubbles, rose Memory Lane. This exquisite bouquet is carefully composed to create a harmonious.",
                image: require("../../icons/virginia_vase.jpg"),
                price: 2375,
                category: "vase",
                quantity: 8,
            },
            {
                id: "9",
                title: 'Basket of roses Memory Lane',
                text:
                    "Basket of Roses Memory Lane with a lush bow. Each rose in this basket is carefully chosen for its soft, pastel hue and delicate fragrance, making it a symbol of tenderness.",
                image: require("../../icons/basket_memory.jpg"),
                price: 6870,
                category: "basket",
                quantity: 20,
            },
        ]
function Navigation() {
    return (
        <div>
            <Layout />
            <ItemContext.Provider value={data}>
            <Routes>
                <Route path="/" element={<Home />} key="/"/>
                <Route path="/catalog" element={<Catalog />} key="/catalog"/>
                <Route path="/cart" element={<h1>Cart</h1>} key="/cart"/>
                <Route path="/item/:itemId" element={<ItemPage />} key="/cart"/>
                <Route path="/*" element={<Navigate to="/"/>} key="/*"/>
            </Routes>
            </ItemContext.Provider>
        </div>
    );
}

export default Navigation;