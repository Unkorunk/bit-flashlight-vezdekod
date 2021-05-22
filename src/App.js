import React, {useEffect, useState} from 'react';
import './App.css';
import {
    AppRoot, Group, HorizontalCell, HorizontalScroll, IconButton,
    Panel, PanelHeader
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {Icon24CheckBoxOff, Icon24CheckBoxOn} from "@vkontakte/icons";
import bridge from '@vkontakte/vk-bridge';

function App() {
    const [bits, setBits] = useState([false, false, false, false, false, false, false, false]);
    const [bitIndex, setBitIndex] = useState(-1)

    useEffect(() => {
        bridge.subscribe((e) => {
            if (e.detail.type === "VKWebAppViewHide") {
                setBits([false, false, false, false, false, false, false, false]);
                bridge.send("VKWebAppFlashSetLevel", {"level": 0})
            }
        })

        setTimeout(() => {
            if (bitIndex + 1 >= bits.length) {
                setBitIndex(0)
            } else {
                setBitIndex(bitIndex + 1)
            }
        }, 1000);
    });

    useEffect(() => {
        bridge.send("VKWebAppFlashSetLevel", {"level": bits[bitIndex] ? 1 : 0})
    }, [bitIndex])

    return (
        <AppRoot>
            <Panel id="header">
                <PanelHeader>Bit Flashlight</PanelHeader>
                <Group>
                    <HorizontalScroll showArrows>
                        <div style={{display: 'flex'}}>
                            {bits.map((it, index) =>
                                <HorizontalCell key={index} size='m' header={<center>{"Bit " + index}</center>}>
                                    <IconButton onClick={() => {
                                        let newBits = [...bits];
                                        newBits[index] = !bits[index];
                                        setBits(newBits);
                                    }}>
                                        {it ? <Icon24CheckBoxOn fill={bitIndex === index ? "green" : "black"}/> :
                                            <Icon24CheckBoxOff fill={bitIndex === index ? "green" : "black"}/>}
                                    </IconButton>
                                </HorizontalCell>
                            )}
                        </div>
                    </HorizontalScroll>
                </Group>
            </Panel>
        </AppRoot>
    );
}

export default App;
