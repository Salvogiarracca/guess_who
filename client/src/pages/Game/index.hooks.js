import {useContext, useState} from "react";
import GameContext from "../../contexts/gameContext.js";
import {checkProperty, endGame, startGame} from "../../apis/games.js";
import {useNavigate} from "react-router-dom";

export const useGame = () => {
    const { difficulty, items, setItems, properties, setProperties, gameId, guess, setGuess, setGameId } = useContext(GameContext);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isTrue, setIsTrue] = useState(false);
    const [finish, setFinish] = useState("");
    const [finishedGame, setFinishedGame] = useState(undefined)
    const [disableButtons, setDisableButtons] = useState(false);
    const navigate = useNavigate();
    const handleClose = ()=> setShow(false);
    const handleShow = ()=> setShow(true);

    const timeout = (name, value, selection) => {setTimeout(()=> {
        const newItems = selection? items.filter(item=>item[name] === value) : items.filter(item => item[name] !== value);
        setItems(newItems);

        const currentProperties = properties.map(property => {
            const values = [...new Set(newItems.map(item => item[property.name]))];
            return { name: property.name, values: values }
        })

        setProperties(currentProperties)
        setDisableButtons(false)
        setShowAlert(false);
    }, 3000)};

    const start = () => {
        startGame(difficulty)
            .then(res => {
                setGameId(res.data.id)
                setItems(res.data.items)
                setProperties(res.data.properties)
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }


    const checkSelection = (name, value) => {
        checkProperty(gameId, {name:name, value: value})
            .then(res => {
                setShowAlert(true)
                setDisableButtons(true)
                setIsTrue(res.data.result)
                timeout(name, value, res.data.result);
            })
            .catch(e =>{
                console.error(e);
            })
    }

    const checkEnd = () => {
        endGame(gameId, {name: guess})
            .then(res => {
                setFinishedGame(res.data.game)
                res.data.result? setFinish("WIN"): setFinish("LOSE")

            })
            .catch(e => {
                console.log(e);
            })
    }

    return {
        difficulty,
        items,
        setItems,
        properties,
        setProperties,
        checkSelection,
        checkEnd,
        handleClose,
        handleShow,
        show,
        guess,
        setGuess,
        isLoading,
        setIsLoading,
        isPlaying,
        setIsPlaying,
        start,
        showAlert,
        isTrue,
        finish,
        finishedGame,
        navigate,
        disableButtons
    }
}