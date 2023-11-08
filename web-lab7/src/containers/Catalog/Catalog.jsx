import React, { useRef, useState } from "react";
import { FiltersContainer, ItemsContainer, SelectWrapper, SortDirectionButton } from "./Catalog.styled";
import CardItem from "../../components/CardItem/CardItem";
import PrimarySelect from "../../components/PrimarySelect/PrimarySelect";
import SearchInput from "../../components/SearchInput/SearchInput";
import {
    CaretUpOutlined,
    CaretDownOutlined
} from "@ant-design/icons";
import { Flex } from "antd";

const data = [
    {
        id: "1",
        title: "Sophie and Sharman bouquet of cream roses",
        text: "Sophie and Sharman is a charming bouquet of cream roses that symbolize tenderness and elegance. This bouquet is an ideal gift for those you love and respect.",
        image: require ("../../icons/white_bouquet.jpg"),
        price: 850,
        category: "roses",
    },
    {
        id: "2",
        title: "Basket of white eustomas",
        text:"A basket of white eustomas is a symbol of purity and elegance. These delicate and pristine flowers have a charm of their own. With their crisp white petals and soft fragrance.",
        image: require ("../../icons/bag_flowers.jpg"),
        price: 3000,
        category: "basket",
    },
    {
        id: "3",
        title: 'A bouquet of 29 White Ohara white roses',
        text: "A bouquet of 29 White Ohara white roses is a stunning and sophisticated gift. Each White Ohara rose is a symbol of purity and timeless beauty.",
        image: require ("../../icons/white_roses.jpg"),
        price: 2400,
        category: "roses",
    },
    {
        id: "4",
        title: 'Bouquet of French roses Ohara and Pink Ohara',
        text:
            "The bouquet of French roses Ohara and Pink Ohara was carefully arranged by an elderly florist named Marcel. He was known far and wide for his extraordinary ability to create.",
        image: require("../../icons/french_roses.jpg"),
        price: 1599,
        category: "roses",
    },
    {
        id: "5",
        title: 'Basket with peony roses spray',
        text:
            "In a cozy countryside cottage, nestled amidst rolling hills and blossoming meadows, there sat a wicker basket brimming with peony roses in full bloom.",
        image: require("../../icons/pink_basket.jpg"),
        price: 3350,
        category: "basket",
    },
    {
        id: "6",
        title: 'Bouquet Aphrodite in a vase',
        text:
            "Bouquet Aphrodite in a vase will beautify any interior.The bouquet includes: hydrangea, matiola, viburnum, genestra, limonium, imported rose, peony, calla.",
        image: require("../../icons/bouquet_vase_white.jpg"),
        price: 4620,
        category: "vase",
    },
    {
        id: "7",
        title: 'Roses mistry bubbles in a vase',
        text:
            "Misty Bubbles rose spray 15 stems in a vase will decorate any interior. Whether given as a gift or used to adorn a space, this bouquet conveys a sense of enchantment and timeless beauty.",
        image: require("../../icons/vase_pink.jpg"),
        price: 3500,
        category: "vase",
    },
    {
        id: "8",
        title: 'Bouquet of flowers Virginia in a vase',
        text:
            "The bouquet includes: tulip, lilac, eucalyptus, rose spray Misty Bubbles, rose Memory Lane. This exquisite bouquet is carefully composed to create a harmonious.",
        image: require("../../icons/virginia_vase.jpg"),
        price: 2375,
        category: "vase",
    },
    {
        id: "9",
        title: 'Basket of roses Memory Lane',
        text:
            "Basket of Roses Memory Lane with a lush bow. Each rose in this basket is carefully chosen for its soft, pastel hue and delicate fragrance, making it a symbol of tenderness.",
        image: require("../../icons/basket_memory.jpg"),
        price: 6870,
        category: "basket",
    },
];

const sortOptions = [
    { value: "no_sort", label: "No sort" },
    { value: "name", label: "Sort by name" },
    { value: "price", label: "Sort by price" },
];

const filterOptions = [
    { value: "all", label: "All categories" },
    { value: "roses", label: "Roses" },
    { value: "basket", label: "Basket flowers" },
    { value: "vase", label: "Flowers in vase" },
];

const sortingFunctions = {
    "price": (a,b) => a.price - b.price,
    "name": (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0),
    "no_sort": () => {}
};

const Catalog = () => {
    const [items, setItems] = useState(data);

    const [sortMode, setSortMode] = useState("no_sort");
    const [filterMode, setFilterMode] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [reverseSort, setReverseSort] = useState(false);

    const applyFilters = ({sort = sortMode, filter = filterMode, search = searchValue, reverse = reverseSort}) => {
        let newItems = [...data];
        console.log(search);

        const searchPattern = new RegExp(search, "i");

        newItems = newItems.filter(a => searchPattern.test(a.title));

        newItems.sort(sortingFunctions[sort]);
        if (filter !== "all") {
            newItems = newItems.filter(a => a.category === filter);
        }

        if (reverse) {
            newItems.reverse();
        }

        console.log(newItems);
        setItems([...newItems]);
        console.log(search);
    }
    
    const onSortChange = (value) => {
        console.log(value);
        setSortMode(value);
        setReverseSort(false);
        applyFilters({sort: value, reverse: false});
    }
    
    const onFilterChange = (value) => {
        console.log(value);
        setFilterMode(value);
        setReverseSort(false);
        applyFilters({filter: value, reverse: false});
    }

    const onSearch = (value) => {
        console.log(value);
        setSearchValue(value);
        setReverseSort(false);
        applyFilters({search: value,  reverse: false});
    }

    const reverseChange = (reverse) => {
        setReverseSort(reverse);
        applyFilters({reverse: reverse});
    }

    return (
        <div>
            <FiltersContainer>
                <SelectWrapper>
                    <PrimarySelect
                        defaultValue={sortMode}
                        onChange={onSortChange}
                        options={sortOptions}
                    />
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <SortDirectionButton 
                            type="text"
                            onClick={() => reverseChange(false)}
                            disabled={!reverseSort}
                        >
                            <CaretUpOutlined style={{ margin: "0px" }} />
                        </SortDirectionButton>
                        <SortDirectionButton 
                            type="text"
                            onClick={() => reverseChange(true)}
                            disabled={reverseSort}
                        >
                            <CaretDownOutlined style={{ margin: "0px" }} />
                        </SortDirectionButton>
                        
                    </div>
                    <PrimarySelect 
                        defaultValue={filterMode}
                        onChange={onFilterChange}
                        options={filterOptions}
                    />
                </SelectWrapper>
                <SearchInput 
                    defaultValue={searchValue}
                    placeholder="Bouquets..."
                    onSearch={onSearch}
                />
            </FiltersContainer>
            <ItemsContainer>
                {
                items.map(({ title, text, image, price, id }) => (
                    <CardItem
                        title={title}
                        text={text}
                        imageSrc={image}
                        price={price}
                        key={id}
                    />
                ))
                }
            </ItemsContainer>
        </div>
    )
};

export default Catalog;