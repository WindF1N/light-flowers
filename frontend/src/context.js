import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {

  const [ state, setState ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const [ account, setAccount ] = useState(null);
  const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
  const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem('refreshToken'));
  const [ isFirstLogin, setIsFirstLogin ] = useState(JSON.parse(localStorage.getItem('isFirstLogin')));

  const [ verifyCodeId, setVerifyCodeId ] = useState(null);
  const [ loadUserInfo, setLoadUserInfo ] = useState(false);

  const [ socket, setSocket ] = useState(null);
  const [ message, setMessage ] = useState(null);
  const [ messages, setMessages ] = useState([]);

  const [ postId, setPostId ] = useState(null);
  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ userPosts, setUserPosts ] = useState([]);

  const [ select, setSelect ] = useState("transport");

  const [ why, setWhy ] = useState(null);
  const [ why2, setWhy2 ] = useState(null);

  const [ transportView, setTransportView ] = useState("grid");
  const [ servicesView, setServicesView ] = useState("grid");
  const [ services_View, setServices_View ] = useState("grid");
  const [ dealersView, setDealersView ] = useState("grid");

  const login = async (data, navigate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/login`, data);
      if ('error' in response.data) {
        alert(response.data.error);
        setError(response.data.error);
      } else {
        // setVerifyCodeId(response.data.code_id);
        if ("user" in response.data) {
          setAccount(response.data.user);
        }
        navigate(response.data.follow.link,
                 { replace: response.data.follow.replace });
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  const verify = async (data, navigate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/verify`, data);
      if ('error' in response.data) {
        setError(response.data.error);
        setLoading(false);
      } else {
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
        if (socket) {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('message');
          setSocket(null);
          setAccount(null);
        }
        setIsFirstLogin(true);
        localStorage.setItem('isFirstLogin', true);
        navigate(response.data.follow.link,
                 { replace: response.data.follow.replace });
      }
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/refresh`, null, {
        headers: {
          Authorization: "Bearer " + refreshToken
        }
      });
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    } catch (error) {
      setError(error.message);
      logout();
    }
  };

  const logout = (navigate) => {
    setLoading(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    if (socket) {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      setSocket(null);
    }
    if (navigate) {
      navigate('/', {replace: true});
    }
    setIsFirstLogin(true);
    localStorage.setItem('isFirstLogin', true);
  }

  // useEffect(() => {
  //   if (!socket) {
  //     setSocket(io(process.env.REACT_APP_SERVER_ENDPOINT.replace("http", "ws"), {
  //       transportOptions: {
  //         polling: {
  //           maxHttpBufferSize: 1e8,
  //           extraHeaders: accessToken ? {
  //             Authorization: "Bearer " + accessToken
  //           } : null
  //         },
  //       }
  //     }));
  //   }
  // }, [socket]);

  useEffect(() => {
    const handleRefresh = async () => {
      await refreshAccessToken();
    };
    if (message) {
      if (message[0] === 'user') {
        if (message[1] === 'me') {
          setAccount(message[2]);
          if (!message[2]?.username && !message[2]?.name && accessToken && refreshToken) {
            if (isFirstLogin) {
              console.log(isFirstLogin)
              setLoadUserInfo(true);
            }
          } else if (message[2]?.username && message[2]?.name && accessToken && refreshToken) {
            setLoadUserInfo(false);
          }
          const timeoutId = setTimeout(() => {
            setLoading(false);
          }, 1200);
          setIsFirstLogin(false);
          localStorage.setItem('isFirstLogin', false);  
          return () => clearTimeout(timeoutId);
        } else if (message[1] === 'list') {
          setUsers(message[2]);
        }
      } else if (message[0] === 'posts') {
        if (message[1] === 'create') {
          setPostId(message[2]);
          setLoading(false);
        } else if (message[1] === 'list') {
          setPosts(message[2].reverse());
          setLoading(false);
        }
      } else if (message[0] === 'error') {
        if (message[1] === 'Token has expired') {
          handleRefresh();
        } else {
          setLoading(false);
          alert(message);
        }
      }
      setMessage(null);
    };
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Подключились к серверу');
        if (!accessToken && !refreshToken) {
          const timeoutId = setTimeout(() => {
            setLoading(false);
          }, 1200);
          return () => clearTimeout(timeoutId);
        };
        if (!account && accessToken && refreshToken) {
          sendMessage(JSON.stringify(["user", "me"]));
        }
      });

      socket.on('disconnect', () => {
        console.log('Отключились от сервера');
      });

      socket.on('message', (msg) => {
        if (!JSON.parse(msg)['error']) {
          setMessages(prevMessages => [...prevMessages, JSON.parse(msg)]);
        } else {
          if (JSON.parse(msg)['error'] === 'Token has expired') {
            setSocket(null);
          };
        };
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('message');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (!message) {
      if (messages.length > 0) {
        setMessage(messages[0]);
        setMessages(prevMessages => prevMessages.slice(1));
      };
    };
  }, [message, messages]);

  const sendMessage = (msg) => {
    if (socket) {
      socket.emit('message', msg);
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage,
                                     message,
                                     setMessage,
                                     socket,
                                     state,
                                     setState,

                                     accessToken,
                                     refreshToken,

                                     account,
                                     setAccount,
                                     verifyCodeId,
                                     setVerifyCodeId,

                                     loading,
                                     setLoading,
                                     loadUserInfo,
                                     setLoadUserInfo,

                                     postId,
                                     setPostId,
                                     posts,
                                     setPosts,
                                     userPosts,
                                     setUserPosts,
                                     users,
                                     setUsers,
                                     select, 
                                     setSelect,

                                     why, 
                                     setWhy,
                                     why2, 
                                     setWhy2,

                                     transportView, 
                                     setTransportView,
                                     servicesView, 
                                     setServicesView,
                                     services_View, 
                                     setServices_View,
                                     dealersView, 
                                     setDealersView,

                                     error,
                                     setError,

                                     login,
                                     verify,
                                     logout}}>
      {children}
    </SocketContext.Provider>
  );
};

const useMainContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export { SocketProvider, useMainContext };
