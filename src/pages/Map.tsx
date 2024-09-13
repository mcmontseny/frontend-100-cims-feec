import React, {useEffect, useState} from "react";
import {Mountain} from "@interfaces/Mountain";
import {Ascent} from "@interfaces/Ascent";
import {Activity} from "@interfaces/Activity";
import MountainDetail from "@components/MountainDetail";
import Stats from "@components/Stats";
import MapComponent from "@components/Map/Map";

const MemoizedMapComponent = React.memo(MapComponent);

function MapPage() {
    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [ascents, setAscents] = useState<Ascent[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedMountain, setSelectedMountain] = useState<Mountain>();

    const fetchData = async () => {
        try {
            const [mountainsResponse, ascentsResponse, activitiesResponse] = await Promise.all([
                fetch("https://backend-100-cims-feec-production.up.railway.app/api/v1/mountains"),
                fetch("https://backend-100-cims-feec-production.up.railway.app/api/v1/ascents"),
                fetch("https://backend-100-cims-feec-production.up.railway.app/api/v1/activities")
            ]);
            setMountains(await mountainsResponse.json());
            setAscents(await ascentsResponse.json());
            setActivities(await activitiesResponse.json());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    const onSelectedMountain = (mountain: Mountain | undefined) => {
        setSelectedMountain(mountain);
    }

    const onCloseMountainDetail = () => {
        setSelectedMountain(undefined);
    }

    return (
        <div className="relative flex-1">
            <MemoizedMapComponent mountains={mountains} ascents={ascents} onSelectMountain={onSelectedMountain} />
            <MountainDetail onClose={onCloseMountainDetail} mountain={selectedMountain} ascents={ascents} activities={activities} />
            <Stats mountains={mountains} ascents={ascents} selectedMountain={selectedMountain} />
        </div>
    );
}

export default MapPage;