/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Col, Row } from 'antd'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import MeetingPageWrapper from './style'
import VideoGrid from './video-grid/VideoGrid'
import VideoGridItem from './video-grid-item/VideoGridItem'
import MessengerBox from './messenger/MessengerBox'
import MeetingControllerWrapper from './meeting-controller/style'
import VideoButton from './meeting-controller/buttons/VideoButton'
import AudioButton from './meeting-controller/buttons/AudioButton'
import ShareScreenButton from './meeting-controller/buttons/ShareScreenButton'
import CopyIdButton from './meeting-controller/buttons/CopyIdButton'
import MessengerButton from './meeting-controller/buttons/MessengerButton'
import ParticipantButton from './meeting-controller/buttons/ParticipantButton'
import CallEndButton from './meeting-controller/buttons/CallEndButton'
import MyVideoItem from './video-grid-item/MyVideoItem'
import PartnerVideoItem from './video-grid-item/PartnerVideoItem'
import MessageListReducer from 'pages/meeting/reducers/MessageListReducer'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'
import useRouter from 'shared/hooks/useRouter'
import { addUser, getChatMsgs, sendChatMsg } from 'pages/meeting/apis'
import { getCurrentUser } from 'core/currentUser'
import WaitingPermissionPopUp from 'pages/meeting/popups/WaitingPermissionPopUp'
import ConnectTimeOutPopup from 'pages/meeting/popups/ConnectTimeOutPopUp'
import JoinRequestPopUp from 'pages/meeting/popups/JoinRequestPopUp'
import PermissionDenied from 'pages/meeting/popups/PermissionDeniedPopUp'
import { showInfo } from 'core/tools'

const initialMessages = []

const MeetingPage = () => {
  const numOfItem = 8
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].slice(0, numOfItem)
  const { width } = useWindowDimensions()
  const { history, match, location } = useRouter()
  const { roomId } = match.params

  const user = getCurrentUser() && JSON.parse(getCurrentUser())
  const [isLoading, setIsLoading] = useState(false)
  const [popUp, setPopUp] = useState('')

  const [messageList, messageListReducer] = useReducer(MessageListReducer, initialMessages)

  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isScreenShared, setIsScreenShared] = useState(false)
  const [isShowMessenger, setShowMessenger] = useState(false)
  const [isHaveNewMessage, setIsHaveNewMessage] = useState(true)
  const [isShowParticipant, setShowParticipant] = useState(false)
  const [isShowRightVideos, setShowRightVideos] = useState(false)
  const isShowRightPart = isShowMessenger || isShowParticipant || isShowRightVideos

  const userVideoRef = useRef(null)
  const userStream = useRef(null)
  const videoTrack = useRef(null)
  const audioTrack = useRef(null)
  const tmpTrack = useRef(null)
  const screenTrack = useRef(null)

  // socket of current user
  const socketRef = useRef(null)
  // socket of user is joining
  const joiningSocketRef = useRef(null)
  const peersRef = useRef([])
  const [peers, setPeers] = useState([])

  const videoButtonHandler = () => {
    console.log(userStream)
    if (userStream.current) {
      if (userVideoRef.current.srcObject && !isScreenShared) {
        videoTrack.current.enabled = !videoTrack.current.enabled
      }
      setIsVideoMuted(!isVideoMuted)
    }
  }
  const audioButtonHandler = () => {
    if (userStream.current) {
      if (userVideoRef.current.srcObject && !isScreenShared) {
        audioTrack.current.enabled = !audioTrack.current.enabled
      }
      setIsAudioMuted(!isAudioMuted)
    }
  }

  const stopShareScreen = () => {
    if (userStream.current) {
      setIsScreenShared(false)
      videoTrack.current = tmpTrack.current
      screenTrack.current.stop()
      userVideoRef.current.srcObject = userStream.current

      peersRef.current.forEach(peerObj => {
        peerObj.peer.replaceTrack(screenTrack.current, videoTrack.current, userStream.current)
      })
    }
  }

  const shareScreen = () => {
    if (userStream.current) {
      navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
        setIsScreenShared(true)
        userVideoRef.current.srcObject = stream
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

  const shareScreenButtonHandler = () => {
    return isScreenShared ? stopShareScreen() : shareScreen()
  }
  const messengerButtonHandler = () => {
    setIsHaveNewMessage(false)
    if (isShowMessenger === false) {
      setShowParticipant(false)
    }
    setShowMessenger(!isShowMessenger)
  }

  const participantButtonHandler = () => {
    if (isShowParticipant === false) {
      setShowMessenger(false)
    }
    setShowParticipant(!isShowParticipant)
  }

  const endCall = () => {
    if (userStream.current) {
      userStream.current.getTracks().forEach(track => track.stop())
    }
    history.push('/classes')
  }

  const createPeer = (partnerId, myStream, myAlias) => {
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

  const addPeer = (incomingSignal, callerID, userIdentity, myStream, myAlias) => {
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

    peer.on('data', data => {
      // clearTimeout(alertTimeout);
      const newMessage = { user: userIdentity, msg: data.toString(), time: Date.now() }
      console.log('old message', messageList)
      messageListReducer({ type: 'addMessage', payload: newMessage })
      setIsHaveNewMessage(true)
    })

    peer.signal(incomingSignal)

    return peer
  }

  const joinInMeeting = () => {
    setIsLoading(true)
    console.log('roomId', roomId)
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(myStream => {
          setIsLoading(false)
          console.log('my stream', myStream)
          userStream.current = myStream
          videoTrack.current = userStream.current.getTracks()[1]
          audioTrack.current = userStream.current.getTracks()[0]
          userVideoRef.current.srcObject = myStream

          socketRef.current.emit('join room', {
            room: roomId,
            userIdentity: user.fullName,
            email: user.email,
          })

          socketRef.current.on('permit?', payload => {
            console.log('Someone ask permit')
            const socketId = payload.id
            joiningSocketRef.current = socketId
            console.log('show ask permit popup')
            setPopUp(`1 ${payload.userAlias}`)
            // identify popup using popup[0] = 1
          })

          socketRef.current.on('all other users', partners => {
            console.log('get other user', partners)
            partners.forEach(partnerId => {
              const peer = createPeer(partnerId, myStream, user.fullName)
              peersRef.current.push({
                peerID: partnerId,
                userIdentity: 'Loading...',
                peer,
              })
            })
            setPeers([...peersRef.current])
          })

          socketRef.current.on('user joined', payload => {
            const peer = addPeer(payload.signal, payload.callerID, payload.userIdentity, myStream, user.fullName)
            peersRef.current.push({
              peerID: payload.callerID,
              userIdentity: payload.userIdentity,
              peer, // this is equivalent to peer: peer
            })

            // add new peerobj to peers state
            setPeers([...peersRef.current])
            setTimeout(() => {
              showInfo(`${payload.userIdentity} has joined the meeting.`)
            }, 1000)
          })

          socketRef.current.on('answer', payload => {
            // finding the corresponding peer which is item.peer
            peersRef.current.find((p, index) => {
              if (p.peerID === payload.id) {
                peersRef.current[index].userIdentity = payload.userIdentity

                // receiving message from this peer
                p.peer.on('data', data => {
                  // clearTimeout(alertTimeout);
                  const newMessage = { user: payload.userIdentity, msg: data.toString(), time: Date.now() }
                  console.log('old message', messageList)
                  messageListReducer({ type: 'addMessage', payload: newMessage })
                  setIsHaveNewMessage(true)
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
            const { id: userSocketId, alias } = payload
            const peerObj = peersRef.current.find(p => p.peerID === userSocketId)
            if (peerObj) {
              peerObj.peer.destroy() // remove all the connections and event handlers associated with this peer
            }
            const otherPeers = peersRef.current.filter(p => p.peerID !== userSocketId) // removing this userId from peers
            peersRef.current = otherPeers // update peersRef
            setPopUp(`2 ${alias}`)
            setPeers(otherPeers) // also update the state to remove the left user's video from screen
          })
        })
        .catch(error => {
          console.log(error)
        })
    }, 1000)
  }

  const denyJoinRequest = () => {
    socketRef.current.emit('permit status', {
      allowed: false,
      id: joiningSocketRef.current,
    })
    setPopUp('')
  }

  const allowJoinRequest = () => {
    socketRef.current.emit('permit status', {
      allowed: true,
      id: joiningSocketRef.current,
    })
    setPopUp('')
  }

  const sendMsg = msg => {
    // also send the message in the backend
    sendChatMsg(roomId, user.email, msg)
      .then(() => {
        const newMessage = { user: 'You', msg, time: Date.now() }
        messageListReducer({ type: 'addMessage', payload: newMessage })

        peersRef.current.forEach(peerObj => {
          const { peer } = peerObj
          peer.send(msg)
        })
      })
      .catch(() => {
        setPopUp('connection timed out')
      })
  }

  // when a user presses the back button, disconnect the socket
  window.onpopstate = () => {
    if (userStream.current) userStream.current.getTracks().forEach(track => track.stop())
    socketRef.current.disconnect()
    window.location.reload()
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
      socketRef.current = io.connect(process.env.REACT_APP_SERVER_URL)
      console.log('>>>>connect', socketRef.current)
      if (!location.state) {
        setPopUp('connection timed out')
      }

      if (!location.state.admin) {
        console.log('isNotAdmin')
        setPopUp('Waiting')

        socketRef.current.emit('permission', {
          user: user.fullName,
          room: roomId,
          email: user.email,
        })

        socketRef.current.on('allowed', chatId => {
          console.log('allowed')
          console.log('chatId', chatId)
          addUser(user.email, chatId)
            .then(() => {
              getChatMsgs(roomId)
                .then(messages => {
                  if (messages.length > 0) setIsHaveNewMessage(true)

                  messages.forEach(message => {
                    let userIdentity = message.sender && message.sender.first_name
                    if (message.sender_username === user.email) {
                      userIdentity = 'You'
                    }
                    const payload = {
                      user: userIdentity,
                      msg: message.text,
                      time: message.created,
                    }
                    initialMessages.push(payload)
                  })

                  joinInMeeting()
                })
                .catch(error => {
                  console.log('get msg fail', error)
                  setIsLoading(false)
                  setPopUp('connection timed out')
                })
            })
            .catch(error => {
              console.log('add user fail', error)
              setIsLoading(false)
              setPopUp('connection timed out')
            })
        })

        socketRef.current.on('denied', () => {
          setTimeout(() => {
            setIsLoading(false)
            setPopUp('denied to join')
            // redirect the user to videochat home page
          }, 1000)
        })

        socketRef.current.on('no permit required', () => {
          console.log('allow direct join')
        })
      } else {
        console.log('isAdmin')
        getChatMsgs(roomId)
          .then(messages => {
            console.log('message', messages)
            if (messages.length > 0) setIsHaveNewMessage(true)
            messages.forEach(message => {
              let userIdentity = message.sender && message.sender.first_name
              if (message.sender_username === user.email) {
                userIdentity = 'You'
              }
              const payload = {
                user: userIdentity,
                msg: message.text,
                time: message.created,
              }
              initialMessages.push(payload)
            })

            joinInMeeting()
          })
          .catch(error => {
            console.log(error)
            setIsLoading(false)
            setPopUp('connection timed out')
          })
      }
    }, 500)
  }, [])

  if (popUp === 'connection timed out') {
    return <ConnectTimeOutPopup onClose={() => history.push('/classes')} onAccept={() => history.push('/classes')} />
  }

  if (popUp === 'denied to join') {
    // popup closes automatically after 4 second
    return (
      <PermissionDenied
        onClose={() => {
          window.location.href = `${window.location.origin}/videochat`
        }}
      />
    )
  }

  return (
    <MeetingPageWrapper>
      {popUp[0] === '1' && (
        <JoinRequestPopUp
          onClose={denyJoinRequest}
          onDenied={denyJoinRequest}
          onAccept={allowJoinRequest}
          data={{ name: popUp.substr(2) }}
        />
      )}

      {isLoading && popUp === 'Waiting' && <WaitingPermissionPopUp />}
      <div className="meeting-main">
        {(!isShowRightPart || width > 480) && (
          <>
            {/* {isScreenShared && <MyVideoItem ref={userVideoRef} />}
            {!isScreenShared && ( */}
            <div className="meeting-videos" style={{ zIndex: 0 }}>
              <VideoGrid numOfItem={numOfItem}>
                {[
                  <MyVideoItem ref={userVideoRef} key={-1} />,
                  ...peers.map(({ peerID, peer }) => <PartnerVideoItem key={peerID} peer={peer} />),
                  // ...items.map(id => <VideoGridItem key={id} />)
                ]}
              </VideoGrid>
            </div>
            {/* )} */}
          </>
        )}

        {isShowRightPart && (
          <div className="meeting-info">
            {isShowMessenger && (
              <MessengerBox sendMsg={sendMsg} messageList={messageList} closeMessenger={messengerButtonHandler} />
            )}
            {!isShowMessenger && !isShowParticipant && isScreenShared && (
              <VideoGrid numOfItem={Math.min(numOfItem, 12)}>
                {items.slice(0, 12).map(id => (
                  <VideoGridItem key={id} />
                ))}
              </VideoGrid>
            )}
          </div>
        )}
      </div>
      <div className="control-bar">
        <MeetingControllerWrapper>
          <Row className="content">
            {width > 800 && (
              <Col className="time" md={3} sm={0} xs={0}>
                24:00
              </Col>
            )}

            <Col className="buttons" md={21} sm={24} xs={24}>
              <VideoButton isVideoMuted={isVideoMuted} onClick={videoButtonHandler} />
              <AudioButton isAudioMuted={isAudioMuted} onClick={audioButtonHandler} />
              <ShareScreenButton isScreenShared={isScreenShared} onClick={shareScreenButtonHandler} />
              <MessengerButton
                isShowMessenger={isShowMessenger}
                isHaveNewMessage={isHaveNewMessage}
                onClick={messengerButtonHandler}
              />
              <ParticipantButton isShowParticipant={isShowParticipant} onClick={participantButtonHandler} />
              <CallEndButton onClick={endCall} />
            </Col>
          </Row>
        </MeetingControllerWrapper>
      </div>
    </MeetingPageWrapper>
  )
}

MeetingPage.propTypes = {}

export default MeetingPage
