import { createContext, useEffect, useState } from "react";
import API_Services from "../api/apiServices";
import { useNavigate, useParams } from "react-router-dom";

const DataContext = createContext()


export const DataProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserMobile, setSelectedUserMobile] = useState('');
    const [loginUserName, setLoginUsername] = useState("")
    const [loginUserEmail, setLoginUserEmail] = useState("")
    const [loginUserId, setLoginUserId] = useState("")
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);


    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    const getAlluser = () => {
        API_Services.getAllUser().then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                setUsers(res.data)
            }
        })
    }


    const handleUserClick = (id) => {
        navigate(`/user/${id}`)
    }

    const handleUserClickWithHeading = (id, name, mobile) => {
        setSelectedUserName(name);
        setSelectedUserMobile(mobile)
        handleUserClick(id);
    };

    const getSpecificUser = () => {
        API_Services.getSpecificUser().then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                setLoginUsername(res.data?.name)
                setLoginUserEmail(res.data?.email)
                setLoginUserId(res.data?._id)
            }
        })
    }

    const sendMessage = (id) => {
        const data = {
            recipientId: id, content: message
        }
        API_Services.sendMessage(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                setMessage("")
            }
        })
    }

    const getMessages = (id) => {
        API_Services.getMessages(id).then((res) => {

            if (res.response_code === 200) {
                setChat(res.data)
            }
        })
    }

    return (
        <DataContext.Provider value={{ isLogin, setIsLogin, getAlluser, users, handleUserClickWithHeading, selectedUserName, selectedUserMobile, getSpecificUser, loginUserName, loginUserEmail, sendMessage, message, setMessage, getMessages, chat, loginUserId }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext