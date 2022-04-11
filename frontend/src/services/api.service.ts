import http from "./http.service";
import { Channel } from "../models/channel";
import { Stream } from "../models/stream";

class ApiService {
  public getChannels = async (): Promise<Channel[]> => {
    const response = await http.get("/channels");
    return response.data;
  };

  public getStreams = async (channelId: string): Promise<Stream[]> => {
    const response = await http.get(`/streams/${channelId}`);
    return response.data;
  };

  public getStreamUrl = async (
    streamId: number
  ): Promise<string | undefined> => {
    const res = await http.get(`/live/stream/url/${streamId}`);
    if (res.status !== 200) {
      alert("Failed to get stream url");
      return;
    }
    return res?.data.url;
  };
}

export default new ApiService();
