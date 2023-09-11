import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PageNotFound} from "./pages/NotFoundPage/index.jsx";
import Login from "./pages/Login/index.jsx";
import UserContext from "./contexts/userContext.js";
import useApp from "./App.hooks.js";
import Home from "./pages/Home/index.jsx";
import GameContext from "./contexts/gameContext.js";
import Game from "./pages/Game/index.jsx";
import Layout from "./pages/Layout/index.jsx";
import ProtectedRoute from "./components/ProtectedPage/index.jsx";
import Statistics from "./pages/Statistics/index.jsx";

function App() {
    const {
        user,
        setUser,
        handleLogout,
        items,
        setItems,
        properties,
        setProperties,
        gameId,
        setGameId,
        difficulty,
        setDifficulty,
        guess,
        setGuess,
        isLoading,
        setShowStats,
        showStats
    } = useApp()
    return (
        <>
            <BrowserRouter>
                <UserContext.Provider
                    value={{user, handleLogout}}
                >
                    <GameContext.Provider
                        value={{ items, setItems, properties, setProperties, gameId, setGameId, difficulty, setDifficulty, guess, setGuess, isLoading, showStats}}
                    >
                        <Routes>
                            <Route element={<Layout/>}>
                                <Route path={"/"} index element={<Home setShowStats={setShowStats}/>}/>
                                <Route path={"/play"} element={<Game/>}/>
                                <Route path={"/stats"} element={
                                    <ProtectedRoute>
                                        <Statistics setShowStats={setShowStats}/>
                                    </ProtectedRoute>
                                }/>
                                <Route path={"/login"} element={<Login setUser={setUser}/>}/>
                            </Route>
                            <Route path={"*"} element={<PageNotFound/>}/>
                        </Routes>
                    </GameContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;
