import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Links from "./pages/Links";
import ShortenerInput from "./utils/ShortnerInput";
import axios from "axios";

const App = () => {
  const [links, setLinks] = useState([]);
  const linksRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToLinks = () => {
    linksRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  //Fetching all urls from database
  const fetchLinks = async () => {
    try {
      const response = await axios.get("http://localhost:5173/api/url");
      setLinks(response.data.data.urls);
    } catch (error) {
      console.log(error);
    }
  };

  

  //Preventing re-renders due to set function
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="w-full h-screen ">
      <Navbar scrollToLinks={scrollToLinks} scrollToInput={scrollToInput} />
      <Home inputRef={inputRef} fetchLinks={fetchLinks}/>
      <Links linksRef={linksRef} fetchLinks={fetchLinks} links={links}/>
    </div>
  );
};

export default App;
