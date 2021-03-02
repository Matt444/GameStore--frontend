import { useState } from 'react';

export default function useAlerts() {
    const [alerts, setAlerts] = useState([]);


    const addAlert = (variant, message) => {    
        setAlerts(alerts.concat({
            variant: variant,
            message: message
        }));
    }

    const delAlert = (message) => {
        console.log("rem",message);
        const index = alertIndex(message);
        if(index !== -1) {
            alerts.splice(index,1);
            setAlerts([].concat(alerts));
        }
    }

    const alertIndex = (message) => {
        if(alerts === null || alerts === undefined || alerts.length === 0) return -1;
        return alerts.map((i) => i.message).indexOf(message);
    }

    return {
        addAlert,
        delAlert,
        alerts
    }
}