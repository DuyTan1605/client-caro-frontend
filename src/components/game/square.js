import React from 'react';
import Config from '../../constants/configs';
import { Button } from 'react-bootstrap';

function Square(props) {
    const { value } = props;
    const { winCell } = props;
    const { isCurrentCell } = props;
    
    const moveColor = value === Config.xPlayer ? Config.plColor.X : Config.plColor.O;
    const className = winCell ? 'square-win' : (isCurrentCell === true ? 'square-current' : 'square');
    return (
        <Button className={className} variant="dark"
                onClick={() => props.handleClick(props.row, props.col)}>
            <font color={moveColor}>{value}</font>
        </Button>
    );
}

export default Square;