import { Container } from '@mui/material';
import React from 'react';
import { useContext, useEffect, useState } from "react";
import Home from "./components/app/Home/Home";
import Login from "./components/app/Login/Login";
import TokenInforamation from "./components/app/TokenInformation/TokenInforamation";
import { TokenSalesContext } from "./contexts/TokenSalesContext";

const App = () => {
    const {
        tokenState,
        tokenContract,
        initContract,
        fetchUserData,
        login,
        logout
    } = useContext(TokenSalesContext);

    //after submitting the from, we want to show notification
    const [showNotification, setShowNotification] = useState();

    // The useEffect hook can be used to fire side-effects during render
    useEffect(async () => {
        await initContract();
    }, []);

    useEffect(async () => {
        if (tokenState) {
            const { walletConnection } = tokenState;
            if (walletConnection && walletConnection.isSignedIn()) {
                await fetchUserData();
            }
        }
    }, [tokenState]);

    return (
        <Container>
            {!(tokenState != null && tokenState.walletConnection.isSignedIn()) ? <Login login={login} /> : <Home logout={logout} />}
            {tokenContract != null && <TokenInforamation />}
            {/* {showNotification && <Notification />} */}
        </Container>
    )
}

export default App;