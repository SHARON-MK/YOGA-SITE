import React, { useState, useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useParams } from 'react-router-dom'
import { trainerInterceptor } from '../../helper/interceptor/axios'

function VideoCall() {
  const { roomId } = useParams()
  const [trainerName, setTrainerName] = useState()

  const getUserName = async () => {
    try {
      const response = await trainerInterceptor({
        url: '/api/trainer/get-trainer-name',
        method: 'get',
      });
      setTrainerName(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []); 

  useEffect(() => {
    const generateKitToken = async () => {
      if (trainerName) {
        const appID = 1002249923;
        const serverSecret = "a51f7ffd916de746cc55505940d312f7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          trainerName
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: myMeetingRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      }
    };

    generateKitToken();
  }, [trainerName, roomId]);   // Generate kitToken when userName changes

  const myMeetingRef = React.useRef();

  return (
    <div className="video-call-main h-screen bg-cover bg-center">
      <div className="video-call-starting" ref={myMeetingRef} />
    </div>

  )
}

export default VideoCall
