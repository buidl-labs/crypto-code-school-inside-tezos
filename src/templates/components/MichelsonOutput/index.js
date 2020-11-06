import React, {useState, useEffect} from 'react'
import { ControlledEditor } from '@monaco-editor/react';
import { Backdrop } from 'src/templates/components/MenuSlider/styled';
import {
    CodeDrawer,
    DrawerHeader,
    Title,
    TabsWrapper,
    TabGroup,
    Tab,
    CodeBody,
    HeaderHeight,
    TabHeight
} from "./styled";
import { IoIosClose } from 'react-icons/io';


function MichelsonOutput({show, setShow, contracts}) {
    
    // type can be either 'code' or 'storage'
    const [activeTab, setActiveTab] = useState({ index: 0, type: 'code'});
    const [currentOutput, setCurrentOutput] = useState('')
    
    useEffect(() => {
        console.log("Showing michelson pane");
        console.log("contract", contracts)
    }, [])

    useEffect(() => {
        setCurrentOutput(
            activeTab.type==='code'? 
                contracts[activeTab.index].code: 
                contracts[activeTab.index].initialStorage
        )
    }, [activeTab, currentOutput])


    return (
        <>
            {show ? 
                <Backdrop 
                onClick={() => setShow(false)} 
                show={show} /> 
            : null}
            <CodeDrawer show={show}>
                <DrawerHeader>
                    <Title>Compiled Code</Title>
                    <IoIosClose
                        style={{ margin: '1rem' }}
                        color="#fff"
                        size={48}
                        onClick={() => setShow(false)}
                    />
                </DrawerHeader>
                <TabsWrapper>
                    { contracts.map((contract, index) => (
                        <TabGroup>
                            <Tab
                                className = {activeTab.index == index && activeTab.type == 'code'? 'active': null}

                                onClick = {() => {
                                    if(activeTab.index === index && activeTab.type === "code") return;
                                    setActiveTab({index: index, type: 'code'})
                                }}
                            >
                                {`Contract-${index}`}
                            </Tab>
                            <Tab
                                className={activeTab.index == index && activeTab.type == 'storage' ? 'active' : null}
                                onClick={() => {
                                    if (activeTab.index === index && activeTab.type === "storage") return;
                                    setActiveTab({ index: index, type: 'storage' })
                                }}
                            >
                                {`Storage-${index}`}
                            </Tab>
                        </TabGroup>
                    ))}
                </TabsWrapper>
                <CodeBody>
                    <ControlledEditor
                        height={`calc(100vh - ${HeaderHeight} - ${TabHeight})`}
                        value={currentOutput}
                        language="ocaml"
                        theme="myCustomTheme"
                        options={{
                            lineNumbers: false,
                            scrollBeyondLastLine: false,
                            minimap: { enabled: false },
                            scrollbar: {
                                vertical: 'hidden',
                                verticalScrollbarSize: 0,
                            },
                            folding: false,
                            readOnly: true,
                            fontSize: 14,
                            fontFamily: "'Inconsolata', monospace",
                            renderSideBySide: false,
                            wordWrap: true,
                            ignoreTrimWhitespace: false,
                            renderWhitespace: 'all',
                            lineHeight: 26,
                        }}
                    />
                </CodeBody>
            </CodeDrawer>
        </>
    )
}

export default MichelsonOutput;
