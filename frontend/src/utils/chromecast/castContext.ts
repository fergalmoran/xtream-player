import { createContext } from "react";
import CastReceiver from "./CastReceiver";

const castContext = createContext<{
  castReceiver?: CastReceiver;
  castSender?: any;
  setSession?: (p: any) => void;
  session?: any;
}>({});

export default castContext;
