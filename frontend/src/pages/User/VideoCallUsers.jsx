import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { userInterceptor } from '../../helper/interceptor/axios';

function VideoCallUsers() {
  const { roomId } = useParams();
  const [userName, setUserName] = useState();

  const getUserName = async () => {
    try {
      const response = await userInterceptor({
        url: '/api/user/get-user-name',
        method: 'get',
      });
      setUserName(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []); 

  useEffect(() => {
    const generateKitToken = async () => {
      if (userName) {
        const appID = 1002249923;
        const serverSecret = "a51f7ffd916de746cc55505940d312f7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          userName
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
  }, [userName, roomId]);   // Generate kitToken when userName changes

  const myMeetingRef = React.useRef();

  return (
    <div className="video-call-main-user h-screen bg-cover bg-center">
      <div className="video-call-starting" ref={myMeetingRef} />
    </div>
  );
}

export default VideoCallUsers;
