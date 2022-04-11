import React from "react";
import { NavLink } from "react-router-dom";
import { Channel } from "../../models/channel";
import { ApiService } from "../../services";

const SidebarContent = () => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  //   const [filteredChannels, setFilteredChannels] = React.useState<Channel[]>([]);
  React.useEffect(() => {
    const fetchChannels = async () => {
      const res = await ApiService.getChannels();
      if (res) {
        setChannels(res);
      }
    };

    fetchChannels();
  }, []);
  //   const _searchChannels = ($event: React.ChangeEvent<HTMLInputElement>) => {
  //     const searchString = $event.target.value;
  //     if (searchString) {
  //       const filteredChannels = channels.filter((c) => {
  //         const result = c.category_name
  //           .toLowerCase()
  //           .includes(searchString.toLowerCase());
  //         console.log(
  //           "sidebar.component",
  //           `Category Name: ${c.category_name}`,
  //           `Search String: ${searchString}`
  //         );
  //         console.log("sidebar.component", "Result", result);
  //         return result;
  //       });
  //       setFilteredChannels(filteredChannels);
  //     } else {
  //       setFilteredChannels(channels);
  //     }
  //   };
  return (
    channels && (
      <div className="py-4 text-gray-500 dark:text-gray-400 scroller">
        <a
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="/"
        >
          Xtreamium
        </a>
        <ul className="mt-6">
          {channels.map((channel: Channel) => (
            <li className="relative px-6 py-3" key={channel.category_id}>
              <NavLink
                to={`/live/channel/${channel.category_id}`}
                className={({ isActive }) =>
                  `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    isActive && "text-gray-800 dark:text-gray-100"
                  }`
                }
                children={({ isActive }) => {
                  return (
                    <>
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                          aria-hidden="true"
                        ></span>
                      )}
                      {/* <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} /> */}
                      <span className="ml-4">{channel.category_name}</span>
                    </>
                  );
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SidebarContent;
