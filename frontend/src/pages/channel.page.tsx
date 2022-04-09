import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Badge,
  Avatar,
  Button,
} from "@windmill/react-ui";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaChromecast } from "react-icons/fa";
import { Stream } from "../models/stream";
import { convertEpochToSpecificTimezone } from "../utils/date-utils";
import { EPGComponent } from "../components";
import {
  CastButton,
  CastProvider,
  useCast,
  useMedia,
} from "../utils/chromecast";

const ChannelPage = () => {
  let params = useParams();
  const cast = useCast();
  const media = useMedia();

  const [streams, setStreams] = React.useState<Stream[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = React.useState("");

  React.useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/streams/${params.channelId}`
      );
      const data = await res.json();
      setStreams(data);
    };

    fetchChannels().catch(console.error);
  }, [params.channelId]);

  const _getStreamUrl = async (streamId: number) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/live/stream/url/${streamId}`
    );
    if (res.status !== 200) {
      alert("Failed to get stream url");
      return;
    }
    const data = await res.json();
    return data?.url;
  };

  const _cast = React.useCallback(
    async (streamId: number) => {
      const streamUrl = await _getStreamUrl(streamId);
      if (streamUrl) {
        await media.playMedia(streamUrl);
      }
    },
    [media]
  );

  const handleXHR = (...args: any[]) => {
    console.log("channel.page", "handleXHR", args);
  };
  const playStream = async (streamId: number) => {
    const url = await _getStreamUrl(streamId);
    if (url) {
      const mpv_args =
        "--keep-open=yes\n--geometry=1024x768-0-0\n--ontop\n--screen=2\n--ytdl-format=bestvideo[ext=mp4][height<=?720]+bestaudio[ext=m4a]\n--border=no".split(
          /\n/
        );

      const query =
        `?play_url=` +
        encodeURIComponent(url) +
        [""].concat(mpv_args.map(encodeURIComponent)).join("&mpv_args=");

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = handleXHR;
      xhr.open("GET", `${process.env.REACT_APP_SERVER_URL}/${query}`, true);
      xhr.send();
    }
  };
  return (
    <CastProvider>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Channel</TableCell>
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {streams.map((stream: Stream) => [
              <TableRow key={stream.num}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden w-10 h-10 ml-2 mr-3 md:block"
                      src={stream.stream_icon}
                      alt="Stream icon"
                    />
                    <div>
                      <p className="font-semibold">{stream.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Added: {convertEpochToSpecificTimezone(stream.added)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={`primary`}>{stream.stream_type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      icon={AiOutlinePlayCircle}
                      layout="link"
                      aria-label="Edit"
                      onClick={() => playStream(stream.stream_id)}
                    >
                    </Button>
                    <CastButton streamId={stream.stream_id} onPlay={_cast} />
                  </div>
                </TableCell>
              </TableRow>,
              <tr key={`${stream.num}-epg`}>
                {false && (
                  <td colSpan={3} className="px-4 py-2 mt-8 border-4 shadow-md">
                    <Suspense fallback={<h1>Loading epg</h1>}>
                      <EPGComponent channelId={stream.epg_channel_id} />
                    </Suspense>
                  </td>
                )}
              </tr>,
            ])}
          </TableBody>
        </Table>
      </TableContainer>
    </CastProvider>
  );
};

export default ChannelPage;
