import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { FaHotjar } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import backgroundImage from "./assets/pexels-gabby-k-7794435.jpg";
import { useStories } from "./hooks/useStories";

// Tab metadata: heading label and the accent colour for its underline.
const TABS = {
  top: { label: "Top stories", accent: "border-red-500" },
  new: { label: "New stories", accent: "border-blue-500" },
  best: { label: "Best stories", accent: "border-green-500" },
};

const formatTime = (timestamp) => {
  const now = new Date();
  const storyTime = new Date(timestamp * 1000);
  const diffInSeconds = Math.floor((now - storyTime) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  return `${diffInHours} hours ago`;
};

const getDomain = (url) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch {
    return "";
  }
};

export default function App() {
  const { data, loading, error, retry } = useStories();
  const [activeTab, setActiveTab] = useState("top");

  // Placeholder rows shown while the feeds are loading.
  const renderSkeletons = () => (
    <ul aria-busy="true" aria-label="Loading stories">
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          className="mb-4 bg-white p-4 border border-gray-200 rounded flex w-9/12 animate-pulse"
        >
          <div className="w-16 text-center">
            <div className="h-6 w-6 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="flex-1 ml-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </li>
      ))}
    </ul>
  );

  const renderStoryList = (stories) => (
    <ul>
      {stories.map((story) => (
        <li
          key={story.id}
          className="mb-4 bg-white p-4 border border-gray-200 rounded flex w-9/12"
        >
          <div className="w-16 text-center text-gray-700">
            <div className="ml-6">
              <IoMdArrowDropup />
            </div>
            <div className="text-l font-bold">{story.score || 0}</div>
          </div>
          <div className="flex-1 ml-4">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:underline"
            >
              {story.title}
            </a>
            <div className="text-sm text-gray-600 flex items-center mt-3">
              <span className="mr-1">by</span>
              <span className="text-red-500 mr-4">{story.by}</span>
              <span>|</span>
              <span className="ml-2 mr-4">{formatTime(story.time)}</span>
              <span>{getDomain(story.url)}</span>
              <span className="ml-2 mr-2">|</span>
              <span className="mr-2">{story.descendants}</span>
              <span>{<LiaCommentSolid />} </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  // Inline error with a retry action — kept within the content area so a failed
  // fetch never replaces the entire app.
  const renderError = () => (
    <div role="alert" className="w-9/12 bg-white border border-red-200 rounded p-4">
      <p className="text-red-600 mb-3">{error}</p>
      <button
        type="button"
        onClick={retry}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return renderSkeletons();
    }
    if (error) {
      return renderError();
    }
    const stories = data[activeTab];
    if (!Array.isArray(stories) || stories.length === 0) {
      return <div className="text-gray-700">No stories available</div>;
    }
    return renderStoryList(stories);
  };

  const tab = TABS[activeTab];

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="w-1/4 sm:w-1/5 border-r border-gray-200 flex flex-col justify-center items-center mb-52 h-auto">
        <div>
          <FaHotjar />
        </div>
        <a
          href="#"
          className="mb-8 text-gray-700 hover:underline"
          onClick={() => setActiveTab("top")}
        >
          Top
        </a>

        <div>
          <FaRegNewspaper />
        </div>
        <a
          href="#"
          className="block mb-8 text-gray-700 hover:underline"
          onClick={() => setActiveTab("new")}
        >
          New
        </a>
        <div>
          <IoLogoFirebase />
        </div>
        <a
          href="#"
          className="block mb-8 text-gray-700 hover:underline"
          onClick={() => setActiveTab("best")}
        >
          Best
        </a>
      </div>
      <div className="flex-1 p-4">
        <h1
          className={`text-2xl font-bold text-gray-800 border-b-2 ${tab.accent} pb-2 mb-4 inline-block`}
        >
          {tab.label}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
}
