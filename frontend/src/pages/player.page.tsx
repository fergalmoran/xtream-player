import React from "react";
import { useParams } from "react-router-dom";
import { HLSPlayer } from "../components";

const PlayerPage = () => {
  const params = useParams();
  const [streamUrl, setStreamUrl] = React.useState("");
  React.useEffect(() => {
    setStreamUrl(
      `${process.env.REACT_APP_API_URL}/live/stream/${params.streamId}`
    );
    console.log("player.page", "streamUrl", streamUrl);
  }, [params.streamId, streamUrl]);
  return (
    <div>
      {streamUrl && (
        <>
          <span>
            <a href={streamUrl} target="_blank" rel="noreferrer">
              {streamUrl}
            </a>
          </span>
          <div className="w-96 h-96">
            <HLSPlayer
              src={streamUrl}
              hlsConfig={{
                debug: true,
                maxLoadingDelay: 4,
                minAutoBitrate: 0,
                lowLatencyMode: true,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerPage;
