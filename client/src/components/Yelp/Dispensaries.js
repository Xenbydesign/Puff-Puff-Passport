import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Dispensaries({ setDispensaries }) {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            toast.error("Geolocation not supported");
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({ latitude, longitude });
        }

        function error() {
            toast.error("Unable to retrieve your location");
        }
    }, []);

    useEffect(() => {
        if (location) {
            fetch("/yelp", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(location),
            })
                .then(resp => resp.json())
                .then(data => {
                    setDispensaries(data)
                })
                .catch((error) => {
                    toast.error("Failed to to find Dispensaries.");
                });
        }
    }, [location, setDispensaries]);

    return null;
}

export default Dispensaries;