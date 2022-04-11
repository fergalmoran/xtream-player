import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Stream } from "../models/stream";
import { convertEpochToSpecificTimezone } from "../utils/date-utils";
import { EPGComponent } from "../components";

import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "../components/widgets/table";
import { Badge, Button, ImageWithFallback } from "../components/widgets";
import { ApiService } from "../services";

const ChannelPage = () => {
  let params = useParams();

  const [streams, setStreams] = React.useState<Stream[]>([]);

  React.useEffect(() => {
    const fetchChannels = async () => {
      if (params.channelId) {
        const data = await ApiService.getStreams(params.channelId);
        setStreams(data);
      }
    };

    fetchChannels().catch(console.error);
  }, [params.channelId]);

  const playStream = async (streamId: number) => {
    const url = await ApiService.getStreamUrl(streamId);
    if (url) {
      const mpv_args =
        "--keep-open=yes\n--geometry=1024x768-0-0\n--ontop\n--screen=2\n--ytdl-format=bestvideo[ext=mp4][height<=?720]+bestaudio[ext=m4a]\n--border=no".split(
          /\n/
        );

      const query =
        `?play_url=` +
        encodeURIComponent(url) +
        [""].concat(mpv_args.map(encodeURIComponent)).join("&mpv_args=");
      try {
        var response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/${query}`
        );
        console.log("channel.page", "playStream", response);
        if (response.status === 501) {
          toast(
            <>
              <div className="font-bold text-gray-800">
                🚫 Unable to play stream!
              </div>
              <div className="text-gray-700 font-sm">
                Cannot find mpv installation.
              </div>
              <a
                className="font-bold text-indigo-600"
                href="https://github.com/fergalmoran/xtreamium/#installmpv"
                target="_blank"
                rel="noreferrer"
              >
                See here
              </a>
            </>,
            {
              position: "top-right",
              closeOnClick: true,
            }
          );
        }
      } catch (e) {
        console.log(e);
        toast(
          <>
            <div className="font-bold text-gray-800">
              🚫 Unable to play stream!
            </div>
            <div className="text-gray-700 font-sm">
              Make sure you've installed the local server.
            </div>
            <a
              className="font-bold text-indigo-600"
              href="https://github.com/fergalmoran/xtreamium/#localserver"
              target="_blank"
              rel="noreferrer"
            >
              Instructions here
            </a>
          </>,
          {
            position: "top-right",
            closeOnClick: true,
          }
        );
      }
    }
  };
  return (
    <TableContainer className="mt-5 mb-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Channel</TableCell>
            <TableCell>Type</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {streams.map((stream: Stream) => [
            <TableRow key={stream.num}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <ImageWithFallback
                    className="hidden w-10 h-10 ml-2 mr-3 md:block"
                    src={stream.stream_icon}
                    alt="Stream icon"
                    fallback="/images/unknown-stream.svg"
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
                  ></Button>
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
  );
};

export default ChannelPage;
