import React, { useState } from 'react';
import Icon from '@mdi/react';
import {
    mdiArrowCollapseDown,
    mdiArrowCollapseUp,
    mdiArrowDown,
    mdiArrowUp,
    mdiGroup,
    mdiUngroup,
} from '@mdi/js';

import { group, ungroup } from '../fabric-handlers/group';
import Popup, { PopupContent, PopupButton } from '../../elements/Popup';
import { ToolbarButton } from '../styles';

function ArrangementToolbar({ getFabric, selected, pushVersion }) {
    const [show, setShow] = useState(false);
    const [top, setTop] = useState(null);
    const [left, setLeft] = useState(null);
    const [content, setContent] = useState(null);

    function closePopup() {
        setShow(false);
        setTop(null);
        setLeft(null);
        setContent(null);
    } 

    function toGroup() {
        group(getFabric, selected, pushVersion);
    }

    function poopGroup() {
        ungroup(getFabric, selected, pushVersion);
    }

    function groupDisabled() {
        return !selected || selected.type !== 'activeSelection';
    }

    function ungroupDisabled() {
        return !selected || selected.type !== 'k-group';
    }

    function bringForward() {
        selected.bringForward(true);
        getFabric().requestRenderAll();
        pushVersion();
    }

    function sendBackward() {
        selected.sendBackwards(true);
        getFabric().requestRenderAll();
        pushVersion();
    }

    function bringToFront() {
        selected.bringToFront();
        getFabric().requestRenderAll();
        closePopup();
        pushVersion();
    }

    function sendToBack() {
        selected.sendToBack();
        getFabric().requestRenderAll();
        closePopup();
        pushVersion();
    }

    function onContextMenu(event, type) {
        event.preventDefault();
        if (!selected) return;

        let click = bringToFront;
        let path = mdiArrowDown;
        let text = 'bring to front';

        if (type === 'back') {
            click = sendToBack;
            path = mdiArrowUp;
            text = 'send to back';
        }
        
        const popup = (
            <PopupContent>
                <PopupButton onClick={click} disabled={!selected}>
                    <Icon
                        path={path}
                        size={1.2}
                    />
                    <span style={{ paddingTop: '4px', paddingLeft: '10px' }}>{text}</span>
                </PopupButton>
            </PopupContent>
        );

        setTop(event.clientY);
        setLeft(event.clientX);
        setContent(popup);
        setShow(true);
    }

    return (
        <>
            <Popup
                show={show}
                top={top}
                left={left}
                close={closePopup}
            >
                {content}
            </Popup>

            <ToolbarButton
                onClick={sendBackward}
                disabled={!selected}
                title="send backward"
                onContextMenu={e => onContextMenu(e, 'back')}
            >
                <Icon
                    path={mdiArrowCollapseUp}
                    size={1.2}
                    id="backward-icon"
                />
            </ToolbarButton>

            <ToolbarButton
                onClick={bringForward}
                disabled={!selected}
                title="bring forward"
                onContextMenu={e => onContextMenu(e)}
            >
                <Icon
                    path={mdiArrowCollapseDown}
                    size={1.2}
                />
            </ToolbarButton>

            <ToolbarButton
                onClick={toGroup}
                disabled={groupDisabled()}
                title="group"
            >
                <Icon
                    path={mdiGroup}
                    size={1.2}
                />
            </ToolbarButton>

            <ToolbarButton
                onClick={poopGroup}
                disabled={ungroupDisabled()}
                title="ungroup"
            >
                <Icon
                    path={mdiUngroup}
                    size={1.2}
                />
            </ToolbarButton>
        </>
    )
}

export default ArrangementToolbar;