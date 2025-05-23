import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//sprungextraordinaryhonorary.com/4f8753b83f5df9ac5a25bdcc25830d82/invoke.js";
    
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="container-4f8753b83f5df9ac5a25bdcc25830d82" style={{ minHeight: '250px' }} />
  );
};

export default AdComponent;
