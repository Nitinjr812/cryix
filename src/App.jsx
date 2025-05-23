import AdComponent from "./components/AdComponet";
import AdsterraAds from "./components/AdsterraAds";
import AdsterraSocialBar from "./components/AdsterraSocialBar";
import Approutes from "./routes/Approutes";
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <AdsterraAds />
      <AdComponent />
      <AdsterraSocialBar />
      <Approutes />
    </>
  );
}
