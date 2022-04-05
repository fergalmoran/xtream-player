import React from "react";
import { useParams } from "react-router-dom";
import { Stream } from "../models/stream";
const ChannelPage = () => {
  let params = useParams();

  const [streams, setStreams] = React.useState<Stream[]>([]);
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

  const handleXHR = (...args: any[]) => {
    console.log("channel.page", "handleXHR", args);
  };
  const playStream = async (streamId: number) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/live/stream/url/${streamId}`
    );
    if (res.status !== 200) {
      alert("Failed to get stream url");
      return;
    }
    const data = await res.json();
    if (data.url) {
      const mpv_args =
        "--keep-open=yes\n--geometry=1024x768-0-0\n--ontop\n--screen=2\n--ytdl-format=bestvideo[ext=mp4][height<=?720]+bestaudio[ext=m4a]\n--border=no".split(
          /\n/
        );

      const query =
        `?play_url=` +
        encodeURIComponent(data.url) +
        [""].concat(mpv_args.map(encodeURIComponent)).join("&mpv_args=");

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = handleXHR;
      xhr.open("GET", `${process.env.REACT_APP_SERVER_URL}/${query}`, true);
      xhr.send();
    }
  };
  return (
    <div className="flex flex-col w-full h-screen ">
      <table className="font-semibold leading-normal table-auto">
        <thead className="sticky top-0 font-semibold text-left text-white uppercase bg-indigo-500">
          <tr className="">
            <th className="text-lg uppercase border-b border-gray-200 1px-5">
              Channel name
            </th>
            <th className="border-b border-gray-200 1px-5">Type</th>
            <th className="py-3 border-b border-gray-200 1px-5"></th>
          </tr>
        </thead>
        <tbody className="divide-y ">
          {streams.map((stream: Stream) => (
            <tr key={stream.num}>
              <td className="px-5 py-5 text-sm border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      alt="stream"
                      src={
                        stream.stream_icon ||
                        `${process.env.PUBLIC_URL}/icons/unknown-stream.png`
                      }
                      className="object-cover w-10 h-10 mx-auto rounded-full "
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {stream.name}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-5 text-sm border-b border-gray-200">
                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                  ></span>
                  <span className="relative">{stream.stream_type}</span>
                </span>
              </td>
              <td className="px-5 py-5 text-sm border-b border-gray-200">
                <button onClick={() => playStream(stream.stream_id)}>
                  <img
                    className="w-10 h-10 "
                    src={`${process.env.PUBLIC_URL}/icons/play.svg`}
                    alt="Play"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChannelPage;
