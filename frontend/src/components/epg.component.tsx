import React from "react";

interface IEPGComponentProps {
  channelId: string;
}
const EPGComponent = ({ channelId }: IEPGComponentProps) => {
  const [programs, setPrograms] = React.useState([]);
  React.useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/epg/${channelId}`
      );
      const data = await res.json();
      setPrograms(data);
    };

    fetchPrograms().catch(console.error);
  }, [channelId]);
  return programs && programs.length ? (
    <div>Here be the epg for {channelId}</div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default EPGComponent;
