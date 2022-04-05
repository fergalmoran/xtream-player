import React from "react";
import { Link } from "react-router-dom";
import { Channel } from "../models/channel";

const Sidebar = () => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [filteredChannels, setFilteredChannels] = React.useState<Channel[]>([]);
  React.useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/channels`);
      const data = await res.json();
      setChannels(data);
      setFilteredChannels(data);
    };

    fetchChannels().catch(console.error);
  }, []);
  const _searchChannels = ($event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = $event.target.value;
    if (searchString) {
      const filteredChannels = channels.filter((c) => {
        const result = c.category_name.toLowerCase().includes(searchString.toLowerCase());
        console.log(
          "sidebar.component",
          `Category Name: ${c.category_name}`,
          `Search String: ${searchString}`
        );
        console.log("sidebar.component", "Result", result);
        return result;
      });
      setFilteredChannels(filteredChannels);
    } else {
      setFilteredChannels(channels);
    }
  };
  return (
    <aside className="flex flex-col w-1/5 pl-2 bg-gray-100">
      <div className="flex items-center justify-center h-16">
        <div className="flex p-8">
          <input
            type="text"
            className="px-4 py-2"
            placeholder="Search..."
            onChange={_searchChannels}
          />
          <button className="flex items-center justify-center px-4 border-l">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>

      <ul className="overflow-y-auto">
        <li>
          {filteredChannels.map((channel: Channel) => (
            <Link
              key={channel.category_id}
              to={`/live/channel/${channel.category_id}`}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span className="ml-3 text-sm font-semibold">
                {channel.category_name}
              </span>
            </Link>
          ))}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
