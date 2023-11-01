import styled from 'styled-components';
import Icon from '@ant-design/icons';

export const IconBase = styled(Icon)`
    font-size: 30px;
    color: ${({color}) => color};
`;
