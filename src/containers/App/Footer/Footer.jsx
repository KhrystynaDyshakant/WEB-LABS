import React from "react";
import logo from "../../../icons/logo.png";
import { HorizontalLine, StyledFooter, IconsWrapper, Wrapper, StyledText } from "./Footer.styled";
import LinkedImg from "../../../components/LinkedImg/LinkedImg";
import Icon, {
    TwitterCircleFilled,
    YoutubeFilled,
    LinkedinFilled,
    FacebookFilled,
} from "@ant-design/icons";

function Footer() {
    return (
        <StyledFooter>
            <Wrapper>
                <div>
                    <h3>Branding stuff</h3>
                    <p>Something text</p>
                </div>
                
                <img src={logo} alt="" width={100}/>

                <IconsWrapper>
                    <LinkedImg href="https://www.facebook.com/" component={FacebookFilled} color='#4267B2'/>
                    <LinkedImg href="https://twitter.com/" component={TwitterCircleFilled} color='#03A9F4'/>
                    <LinkedImg href="https://www.linkedin.com/" component={LinkedinFilled} color='#007AB9'/>
                    <LinkedImg href="https://youtube.com/" component={YoutubeFilled} color='#FF0000'/>
                </IconsWrapper>
            </Wrapper>
            <HorizontalLine />
            <StyledText>2023 IoT © Copyright all rights reserved</StyledText>
        </StyledFooter>
    );
}

export default Footer;