import styled from '@emotion/styled';


export const HeaderHeight = '76px';
export const TabHeight = '36px';

export const CodeDrawer = styled.div`
    height: 100%;
    width: calc(100vw - (100vw / 2.4));
    position: fixed;
    top: 0;
    right: 0;
    z-index: 200;
    box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
    transform: ${props => (props.show ? 'translateX(0)' : 'translateX(130%)')};
    transition: transform 0.4s ease-out;
    background-color: #091a28;
    overflow-y: hidden;
`

export const DrawerHeader = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: ${HeaderHeight};
`

export const Title = styled.h2`
    align-self: center;
    margin: 1rem;
    margin-left: 1.5rem;
    color: #ffffff;
`

export const TabsWrapper = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: start;
    height: ${TabHeight};
`

export const TabGroup = styled.div`
    margin-right: 1rem;
    display: flex;

`

export const Tab = styled.button`
    background: #253f54;
    color: #84a3ba;
    border: 1px solid #253f54;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    margin-right: .5rem;
    padding: 10px 25px;
    height: 100%;
    font-size: 0.85rem;
    cursor: pointer;

    &.active{
        color: white;
    }
`
export const CodeBody = styled.div``