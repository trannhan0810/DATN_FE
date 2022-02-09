/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useRef, useState, useReducer } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
// import { useAuth0 } from '@auth0/auth0-react'
import PropTypes from 'prop-types'
import MessageListReducer from './reducers/MessageListReducer'
import { addUser, getChatMsgs, sendChatMsg } from './apis'
import PartnerVideo from './PartnerVideo'
import Messenger from './Messenger/Messenger'
import ConnectTimeOutPopup from './popups/ConnectTimeOutPopUp'
import PermissionDeniedPopUp from './popups/PermissionDeniedPopUp'
import JoinRequestPopUp from './popups/JoinRequestPopUp'
import MeetLinkCopiedPopUp from './popups/MeetLinkCopiedPopUp'
import UserLeftPopUp from './popups/UserLeavingPopUp'
import UserJoiningPopUp from './popups/UserJoiningPopUp'
import WaitingPermissionPopUp from './popups/WaitingPermissionPopUp'
import VideoChatWrapper from './style'
import ControllerBar from './ControllerBar/ControllerBar'
import { getCurrentUser } from 'core/currentUser'

const initialState = []

const Room = props => {
  const silenceAudio = new Audio('/sounds/silence.mp3')
  const hangUpAudio = new Audio('/sounds/hangupsound.mp3')
  const joinInAudio = new Audio('/sounds/joinsound.mp3')
  const permitAudio = new Audio('/sounds/permission.mp3')
  const waitingAudio = new Audio('/sounds/waiting.mp3')
  const errorAudio = new Audio('/sounds/error.mp3')
  const chatNotificationAudio = new Audio('/sounds/chat.mp3')

  const [messageList, messageListReducer] = useReducer(MessageListReducer, initialState)
  const [isMessenger, setIsMessenger] = useState(false)
  const [messageAlert, setMessageAlert] = useState(false)

  // const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0()
  const user = getCurrentUser()
  const [loading, setLoading] = useState(false)
  const [popUp, setPopUp] = useState('')
  const [peers, setPeers] = useState([])
  const [videoMuted, setVideoMuted] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)
  const [screenShared, setScreenShared] = useState(false)

  const joiningSocket = useRef()
  const socketRef = useRef()
  const userVideo = useRef()
  const userStream = useRef()
  const audioTrack = useRef()
  const videoTrack = useRef()
  const tmpTrack = useRef()
  const screenTrack = useRef()
  const peersRef = useRef([]) // array of peer objects
  const { match, location, history } = props
  const { roomID } = match.params

  // when a user presses the back button, disconnect the socket
  window.onpopstate = () => {
    if (userStream.current) userStream.current.getTracks().forEach(track => track.stop())
    socketRef.current.disconnect()
    window.location.reload()
  }

  const joinPersonIn = () => {
    joinInAudio.play()
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(myStream => {
          setLoading(false)
          userStream.current = myStream
          videoTrack.current = userStream.current.getTracks()[1]
          audioTrack.current = userStream.current.getTracks()[0]

          console.log(videoTrack.current)
          console.log(audioTrack.current)
          console.log(userVideo.current)
          userVideo.current.srcObject = myStream
          // const userAlias =
          //   'given_name' in user && user.given_name.length > 0 ? `${user.given_name} ${user.family_name}` : user.email

          const userAlias = user?.fullName
          socketRef.current.emit('join room', {
            room: roomID,
            userIdentity: userAlias,
            email: user.email,
          })

          socketRef.current.on('permit?', payload => {
            permitAudio.play()
            const socketid = payload.id
            joiningSocket.current = socketid
            setPopUp(`1 ${payload.userAlias}`)
            // identify popup using popup[0] = 1
          })

          // this is received by the user who just joined
          // we get all the users present in the room
          socketRef.current.on('all other users', partners => {
            // create a peer for us corresponding to connection to every other user in the room
            partners.forEach(partnerId => {
              const peer = createPeer(partnerId, myStream, userAlias)
              peersRef.current.push({
                peerID: partnerId, // this particular peer is representing conection b/w me and partnerId
                userIdentity: 'Loading...',
                peer,
              })
            })
            setPeers([...peersRef.current]) // update the state to render their streams
          })

          // this event is received by a user who is already present within the room
          // so we need to add peer corresponding to the new comer
          // we are also receiving peer signal(offer) from new comer
          socketRef.current.on('user joined', payload => {
            joinInAudio.play()
            const peer = addPeer(payload.signal, payload.callerID, payload.userIdentity, myStream, userAlias)
            peersRef.current.push({
              peerID: payload.callerID,
              userIdentity: payload.userIdentity,
              peer, // this is equivalent to peer: peer
            })

            // add new peerobj to peers state
            setPeers([...peersRef.current])
            setTimeout(() => {
              setPopUp(`3 ${payload.userIdentity}`)
            }, 1000)
          })

          // now the peer who has joined just now is receiving the retrned signal
          // from the peers to whom it had sent signal to
          socketRef.current.on('answer', payload => {
            // finding the corresponding peer which is item.peer
            peersRef.current.find((p, index) => {
              if (p.peerID === payload.id) {
                peersRef.current[index].userIdentity = payload.userIdentity

                // receiving message from this peer
                p.peer.on('data', data => {
                  // clearTimeout(alertTimeout);
                  messageListReducer({
                    type: 'addMessage',
                    payload: {
                      user: payload.userIdentity,
                      msg: data.toString(),
                      time: Date.now(),
                    },
                  })

                  if (!isMessenger) setMessageAlert(true)
                  chatNotificationAudio.play()
                })

                p.peer.signal(payload.signal) // accepting the returned signal
                return true
              }
              return false
            })
            // this completes the handshake
            setPeers([...peersRef.current])
          })

          socketRef.current.on('user left', payload => {
            const userId = payload.id
            const { alias } = payload
            const peerObj = peersRef.current.find(p => p.peerID === userId)
            if (peerObj) {
              peerObj.peer.destroy() // remove all the connections and event handlers associated with this peer
            }
            const peers = peersRef.current.filter(p => p.peerID !== userId) // removing this userId from peers
            peersRef.current = peers // update peersRef
            setPopUp(`2 ${alias}`)
            setPeers(peers) // also update the state to remove the left user's video from screen
          })
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
          errorAudio.play()
          setPopUp('connection timed out')
        })
    }, 1000)
  }

  useEffect(() => {
    silenceAudio.autoplay = true
    setTimeout(() => {
      if (!location.state) {
        localStorage.setItem('room', roomID)
        window.location.href = `${window.location.origin}/videochat`
      } else {
        setLoading(true)
        socketRef.current = io.connect('http://localhost:3001/') // connecting with the socket.io server

        // if the user is not admin, ask for permission to join the call
        if (!location.state.admin) {
          console.log('not admin')
          const timer = setInterval(() => {
            waitingAudio.play()
          }, 100)
          setPopUp('Waiting')
          // const userAlias =
          //   'given_name' in user && user.given_name.length > 0 ? `${user.given_name} ${user.family_name}` : user.email
          const user = getCurrentUser()
          const userAlias = user.fullName
          socketRef.current.emit('permission', {
            user: userAlias,
            room: roomID,
            email: user.email,
          })

          socketRef.current.on('no permit required', () => {
            // fetch the chat messages
            getChatMsgs(roomID)
              .then(messages => {
                if (messages.length > 0) setMessageAlert(true)
                messages.forEach(message => {
                  // let userIdentity =
                  //   'first_name' in message.sender && message.sender.first_name.length > 0
                  //     ? `${message.sender.first_name} ${message.sender.last_name}`
                  //     : message.sender_username
                  let userIdentity = message.sender && message.sender.first_name
                  if (message.sender_username === user.email) {
                    userIdentity = 'You'
                  }
                  const payload = {
                    user: userIdentity,
                    msg: message.text,
                    time: message.created,
                  }
                  initialState.push(payload)
                })

                waitingAudio.pause()
                clearInterval(timer)
                joinPersonIn()
              })
              .catch(err => {
                setLoading(false)
                errorAudio.play()
                console.log('get message fail')
                setPopUp('connection timed out')
              })
          })

          socketRef.current.on('allowed', chatId => {
            // allowed in the call
            // add this user to the chat
            addUser(user.email, chatId)
              .then(() => {
                // fetch the chat messages
                getChatMsgs(roomID)
                  .then(messages => {
                    if (messages.length > 0) setMessageAlert(true)
                    messages.forEach(message => {
                      // let userIdentity =
                      //   'first_name' in message.sender && message.sender.first_name.length > 0
                      //     ? `${message.sender.first_name} ${message.sender.last_name}`
                      //     : message.sender_username
                      let userIdentity = message.sender && message.sender.first_name
                      if (message.sender_username === user.email) {
                        userIdentity = 'You'
                      }
                      const payload = {
                        user: userIdentity,
                        msg: message.text,
                        time: message.created,
                      }
                      initialState.push(payload)
                    })
                    waitingAudio.pause()
                    clearInterval(timer)
                    joinPersonIn()
                  })
                  .catch(err => {
                    // error in fetching chat messages
                    console.log('get message fail')
                    setLoading(false)
                    errorAudio.play()
                    setPopUp('connection timed out')
                  })
              })
              .catch(err => {
                console.log('add user fail')
                // error in adding user to chat
                setLoading(false)
                // redirect the user to videochat home page
                errorAudio.play()
                setPopUp('connection timed out')
              })
          })

          socketRef.current.on('denied', () => {
            waitingAudio.pause()
            clearInterval(timer)

            setTimeout(() => {
              errorAudio.play()
              setLoading(false)
              setPopUp('denied to join')
              // redirect the user to videochat home page
            }, 1000)
          })
        } else {
          console.log('admin')
          // fetch the chat messages
          getChatMsgs(roomID)
            .then(messages => {
              if (messages.length > 0) setMessageAlert(true)
              messages.forEach(message => {
                // let userIdentity =
                //   'first_name' in message.sender && message.sender.first_name.length > 0
                //     ? `${message.sender.first_name} ${message.sender.last_name}`
                //     : message.sender_username
                let userIdentity = message.sender && message.sender.first_name
                if (message.sender_username === user.email) {
                  userIdentity = 'You'
                }
                const payload = {
                  user: userIdentity,
                  msg: message.text,
                  time: message.created,
                }
                initialState.push(payload)
              })
              joinPersonIn()
            })
            .catch(err => {
              console.log('get msg fail')
              console.log(err)
              // error in fetching chat messages
              setLoading(false)
              errorAudio.play()
              setPopUp('connection timed out')
            })
        }
      }
    }, 500)
  }, [])

  function createPeer(partnerId, myStream, myAlias) {
    // If I am joining the room, I am the initiator
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.stunprotocol.org',
          },
          {
            urls: 'turn:35.244.6.128:3478?transport=tcp',
            username: 'kurento',
            credential: 'kurento',
          },
        ],
      },
    })

    if (audioTrack.current) peer.addTrack(audioTrack.current, myStream)
    if (videoTrack.current) peer.addTrack(videoTrack.current, myStream)

    // since here initiator is true, whenever peer is created it signals
    // and the below function gets called
    peer.on('signal', signal => {
      socketRef.current.emit('offer', {
        userToSignal: partnerId,
        userIdentity: myAlias,
        callerID: socketRef.current.id,
        signal,
      })
    })

    peer.on('connect', () => {
      // wait for connect event before using the data channel
    })
    return peer
  }

  function addPeer(incomingSignal, callerID, userIdentity, myStream, myAlias) {
    // since I am receiving the offer, initiator = false
    const peer = new Peer({
      initiator: false,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.stunprotocol.org',
          },
          {
            urls: 'turn:35.244.6.128:3478?transport=tcp',
            username: 'kurento',
            credential: 'kurento',
          },
        ],
      },
    })

    if (audioTrack.current) peer.addTrack(audioTrack.current, myStream)
    if (videoTrack.current) peer.addTrack(videoTrack.current, myStream)

    // here initiator is false,
    // so the below event is fired only when our peer accepts the incomingSignal
    // i.e peer.signal(incomingSignal) will fire the below function
    peer.on('signal', signal => {
      socketRef.current.emit('answer', {
        signal,
        callerID,
        userIdentity: myAlias,
      })
    })

    peer.on('connect', () => {
      // wait for connect event before using the data channel
    })

    // receiving message from this peer
    peer.on('data', data => {
      // clearTimeout(alertTimeout);
      messageListReducer({
        type: 'addMessage',
        payload: {
          user: userIdentity,
          msg: data.toString(),
          time: Date.now(),
        },
      })

      if (!isMessenger) setMessageAlert(true)
      chatNotificationAudio.play()
    })

    peer.signal(incomingSignal)

    return peer
  }

  const shareScreen = () => {
    if (userStream.current) {
      navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
        setScreenShared(true)

        // store the video track i.e. our web cam stream into tmpTrack
        // and replace the video track with our screen track
        // so that it will be streamed on our screen as well as to our remote peers
        userVideo.current.srcObject = stream
        screenTrack.current = stream.getTracks()[0]
        tmpTrack.current = videoTrack.current
        videoTrack.current = screenTrack.current

        peersRef.current.forEach(peerObj => {
          peerObj.peer.replaceTrack(
            tmpTrack.current, // prev video track - webcam
            videoTrack.current, // current video track - screen track
            userStream.current,
          )
        })

        screenTrack.current.onended = () => {
          stopShareScreen()
        }
      })
    }
  }

  const stopShareScreen = () => {
    if (userStream.current) {
      setScreenShared(false)

      // restore the videoTrack which was stored earlier in tmpTrack when screensharing was turned on
      videoTrack.current = tmpTrack.current

      // stop the screentrack
      screenTrack.current.stop()

      // reassign our stream to the prev stream i.e. to that consisting of webcam video and audio
      userVideo.current.srcObject = userStream.current

      // replace the screenTrack with videotrack for each remote peer
      peersRef.current.forEach(peerObj => {
        peerObj.peer.replaceTrack(screenTrack.current, videoTrack.current, userStream.current)
      })
    }
  }

  const endCall = () => {
    // play the call ending sound
    hangUpAudio.play()

    // stop all tracks - audio and video
    if (userStream.current) {
      userStream.current.getTracks().forEach(track => track.stop())
    }
    socketRef.current.disconnect()
    history.push('/videochat')
  }

  const muteVideo = () => {
    if (userStream.current) {
      if (userVideo.current.srcObject) {
        if (!screenShared) {
          videoTrack.current.enabled = !videoTrack.current.enabled
        }
      }
      setVideoMuted(prevStatus => !prevStatus)
    }
  }

  const muteAudio = () => {
    if (userStream.current) {
      if (userVideo.current.srcObject) {
        audioTrack.current.enabled = !audioTrack.current.enabled
      }
      setAudioMuted(prevStatus => !prevStatus)
    }
  }

  const sendMsg = msg => {
    // also send the message in the backend
    const user = getCurrentUser() && JSON.parse(getCurrentUser())
    sendChatMsg(roomID, user.email, msg)
      .then(() => {
        messageListReducer({
          type: 'addMessage',
          payload: {
            user: 'You',
            msg,
            time: Date.now(),
          },
        })
        peersRef.current.forEach(peerObj => {
          const { peer } = peerObj
          peer.send(msg)
        })
      })
      .catch(() => {
        errorAudio.play()
        setPopUp('connection timed out')
      })
  }

  const closePopUp = () => setPopUp('')

  const backToVideoChatHome = () => {
    // setPopUp("");
    window.location.href = `${window.location.origin}/videochat`
  }

  const denyJoinRequest = socketId => {
    socketRef.current.emit('permit status', {
      allowed: false,
      id: joiningSocket.current,
    })
    closePopUp()
  }

  const allowJoinRequest = () => {
    socketRef.current.emit('permit status', {
      allowed: true,
      id: joiningSocket.current,
    })
    closePopUp()
  }

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomID)
    setPopUp('meet link copied')
  }

  if (popUp === 'connection timed out') {
    return <ConnectTimeOutPopup onClose={backToVideoChatHome} onAccept={backToVideoChatHome} />
  }

  if (popUp === 'denied to join') {
    // popup closes automatically after 4 second
    return <PermissionDeniedPopUp onClose={backToVideoChatHome} />
  }

  if (!location.state) return <VideoChatWrapper />
  return (
    <VideoChatWrapper>
      {isMessenger && <Messenger setIsMessenger={setIsMessenger} sendMsg={sendMsg} messageList={messageList} />}
      {popUp[0] === '1' && (
        <JoinRequestPopUp
          onClose={denyJoinRequest}
          onDeny={denyJoinRequest}
          onAccept={allowJoinRequest}
          data={{ name: popUp.substr(2) }}
        />
      )}
      {popUp === 'meet link copied' && <MeetLinkCopiedPopUp onClose={closePopUp} onAccept={closePopUp} />}
      {popUp[0] === '2' && (
        <UserLeftPopUp onClose={closePopUp} onAccept={closePopUp} data={{ name: popUp.substr(2) }} />
      )}
      {popUp[0] === '3' && (
        <UserJoiningPopUp onClose={closePopUp} onAccept={closePopUp} data={{ name: popUp.substr(2) }} />
      )}
      {loading && popUp === 'Waiting' && <WaitingPermissionPopUp />}
      <div id="grid-root">
        <ImageList rowHeight="auto" id="grid-list" cols={2} spacing={20}>
          <ImageListItem key="1" cols={peers.length === 0 || screenShared ? 2 : 1} rows={2}>
            <video id="mine" muted controls ref={userVideo} autoPlay playsInline />
            <style>
              {`
                #mine {
                  transform: ${screenShared ? 'rotateY(0deg)' : 'rotateY(180deg)'};
                }

                #mine::-webkit-media-controls-panel {
                  transform: ${screenShared ? 'rotateY(0deg)' : 'rotateY(180deg)'};
                }
              `}
            </style>
            <ImageListItemBar title="You" position="top" />
          </ImageListItem>
          {peers.map(peerObj => {
            return (
              <ImageListItem key={peerObj.peerID} cols={1} rows={2}>
                <PartnerVideo key={peerObj.peerID} peer={peerObj.peer} user={peerObj.peerID} />
                <ImageListItemBar title={peerObj.userIdentity} titlePosition="top" actionPosition="right" />
              </ImageListItem>
            )
          })}
        </ImageList>
      </div>
      <ControllerBar
        userStream={userStream}
        videoMuted={videoMuted}
        muteVideo={muteVideo}
        audioMuted={audioMuted}
        muteAudio={muteAudio}
        screenShared={screenShared}
        shareScreen={shareScreen}
        stopShareScreen={stopShareScreen}
        copyRoomId={copyRoomId}
        setPopUp={setPopUp}
        messageAlert={messageAlert}
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        setMessageAlert={setMessageAlert}
        peers={peers}
        endCall={endCall}
      />
    </VideoChatWrapper>
  )
}

Room.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ roomID: PropTypes.string }) }),
  history: PropTypes.shape({ push: PropTypes.func }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      authorised: PropTypes.bool,
      admin: PropTypes.bool,
    }),
  }),
}

export default Room
