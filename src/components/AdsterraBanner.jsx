import { useEffect } from "react";

const AdsterraBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//sprungextraordinaryhonorary.com/4f8753b83f5df9ac5a25bdcc25830d82/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.getElementById("ad-container")?.appendChild(script);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        margin: "20px auto",
        maxWidth: "400px",
        textAlign: "center"
      }}
    >
      <div id="container-4f8753b83f5df9ac5a25bdcc25830d82"></div>
      <div id="ad-container"></div>
    </div>
  );
};

export default AdsterraBanner;
