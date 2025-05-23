import { useEffect } from 'react';

function AdsterraSocialBar() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//pl26710091.profitableratecpm.com/e9/b7/d6/e9b7d6616a09b75578706430aed69b97.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
}
export default AdsterraSocialBar;
