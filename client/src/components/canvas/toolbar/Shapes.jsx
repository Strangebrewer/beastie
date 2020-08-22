import React from 'react';
import { addCircle, addRect, addTriangle } from '../fabric-handlers/shapes';
import Icon from '@mdi/react';
import {
    mdiCheckboxBlankCircleOutline,
    mdiSquareOutline,
    mdiTriangleOutline
} from '@mdi/js';

import { ToolbarButton } from '../styles';

function ShapesToolbar({ getFabric }) {
    const newCircle = () => {
        addCircle(getFabric);
    }

    const newRect = () => {
        addRect(getFabric);
    }

    const newTriangle = () => {
        addTriangle(getFabric);
    }

    return (
        <>
            <ToolbarButton onClick={newCircle}>
                <Icon
                    path={mdiCheckboxBlankCircleOutline}
                    title="add circle"
                    size={1.2}
                />
            </ToolbarButton>

            <ToolbarButton onClick={newRect}>
                <Icon
                    path={mdiSquareOutline}
                    title="add rectangle"
                    size={1.2}
                />
            </ToolbarButton>

            <ToolbarButton onClick={newTriangle}>
                <Icon
                    path={mdiTriangleOutline}
                    title="add triangle"
                    size={1.2}
                />
            </ToolbarButton>
        </>
    )
}

export default ShapesToolbar;
