import React, {useMemo, useState} from "react";
import {Mountain} from "@interfaces/Mountain";
import {CustomFlowbiteTheme, Drawer} from "flowbite-react";
import {Ascent} from "@interfaces/Ascent";
import {Activity} from "@interfaces/Activity";
import Badge from "@components/Badge";
import {convertSpeedToKmh, formatDateLongWithTime, formatDistance, formatTime} from "@utils/index";

interface MountainDetailProps {
    onClose: () => void;
    mountain?: Mountain;
    ascents: Ascent[];
    activities: Activity[];
}

function MountainDetail({ onClose, mountain, ascents, activities }: MountainDetailProps) {

    const mountainIsCompleted = useMemo(() => {
        if (!mountain || !ascents.length) return false;
        return ascents.some((ascent) => ascent.mountain_id === mountain.id);
    }, [ascents, mountain]);

    const mountainActivity: Activity | undefined = useMemo(() => {
        if (!mountain || !activities.length || !ascents.length) return;
        const activityId = ascents.find((ascent) => ascent.mountain_id === mountain.id)?.activity_id;
        if (!activityId) return;
        return activities.find((activity) => activity.id === activityId);
    }, [activities, mountain, ascents]);


    const [isImageLoading, setIsImageLoading] = useState(true);

    const customTheme: CustomFlowbiteTheme["drawer"] = {
        root: {
            "base": "fixed z-40 overflow-y-auto bg-white transition-transform dark:bg-gray-800 rounded-t-2xl max-h-[80%] h-auto",
            "backdrop": "fixed inset-0 z-[500] bg-gray-900/50 dark:bg-gray-900/80"
        }
    };

    return (
                <Drawer theme={customTheme} open={!!mountain} onClose={onClose} position="bottom" className="z-[501] transition-all duration-500 ease-in-out">
                    <div className="flex flex-col relative">
                        <button className="absolute top-4 right-4 p-0.5 rounded-full bg-[#ffffff99] z-[401]" onClick={onClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                        {mountain && (
                            <>
                                <div className="relative w-full" style={{ height: "280px" }}>
                                    {/* Skeleton Loader */}
                                    {isImageLoading && (
                                        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-t-2xl"></div>
                                    )}

                                    {/* Imagen */}
                                    <img
                                        src={mountain.image}
                                        alt={mountain.name}
                                        className={`w-full object-cover rounded-t-2xl transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                        style={{ objectFit: "cover", height: "280px" }}
                                        onLoad={() => setIsImageLoading(false)}
                                    />
                                </div>
                                <div className="flex flex-col gap-[12px] p-4">
                                    <div className="flex gap-[6px]">
                                        <Badge color={mountain.essencial ? 'black' : 'gray'} size="sm">
                                            Cim {mountain.essencial ? 'essencial' : 'bàsic'}
                                        </Badge>
                                        {mountainIsCompleted && (<Badge color="green" size="sm">
                                            Completat
                                        </Badge>)}
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="whitespace tracking-tight text-3xl font-bold">{mountain.name}</h3>
                                        <span className="text-neutral-500">{mountain.height} m</span>
                                    </div>

                                    <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Fitxa técnica</h3>

                                    <div className="flex flex-col gap-[8px]">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                data-id="16"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            <span>{mountain.region}</span>
                                        </div>

                                        <div className="flex items-center gap-2" data-id="18">
                                            <svg
                                                data-id="19"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-5 h-5"
                                            >
                                                <line x1="2" x2="5" y1="12" y2="12"></line>
                                                <line x1="19" x2="22" y1="12" y2="12"></line>
                                                <line x1="12" x2="12" y1="2" y2="5"></line>
                                                <line x1="12" x2="12" y1="19" y2="22"></line>
                                                <circle cx="12" cy="12" r="7"></circle>
                                            </svg>
                                            <span>
                                        {mountain.latitude}, {mountain.longitude}
                                    </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                className="text-base hover:underline text-[#737373]"
                                                href={mountain.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Més informacio
                                            </a>
                                        </div>
                                    </div>

                                    <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Detall ascensió</h3>

                                    <div>
                                        {!mountainIsCompleted && (<div className="flex flex-col gap-2">
                                            <span className="text-neutral-600">
                                                Encara no has pujat aquest cim. A què esperes? Deixa-hi la teva petjada!
                                            </span>
                                            <span className="text-neutral-600">
                                                Connecta el teu compte de {" "}
                                                <a className="text-black font-bold hover:underline" href="https://es.wikiloc.com/" target="_blank" rel="noreferrer">Wikiloc</a>
                                                {" "}
                                                o
                                                {" "}
                                                <a className="text-black font-bold hover:underline" href="https://strava.com/" target="_blank" rel="noreferrer">Strava</a>
                                                {" "}
                                                i registra els teus ascensos automàticament.
                                            </span>
                                        </div>)}

                                        {(mountainIsCompleted && !mountainActivity) && (<div className="flex flex-col gap-2">
                                            <span className="text-neutral-600">
                                               Gran feina, has completat aquest cim! Segueix així!
                                            </span>
                                            <span className="text-neutral-600">
                                                Connecta el teu compte de {" "}
                                                <a className="text-black font-bold hover:underline" href="https://es.wikiloc.com/" target="_blank" rel="noreferrer">Wikiloc</a>
                                                {" "}
                                                o
                                                {" "}
                                                <a className="text-black font-bold hover:underline" href="https://strava.com/" target="_blank" rel="noreferrer">Strava</a>
                                                {" "}
                                                i registra els teus ascensos automàticament.
                                            </span>
                                        </div>)}

                                        {(mountainIsCompleted && mountainActivity) && (
                                            <div className="rounded-lg border shadow-sm h-auto p-4 flex flex-col gap-3">
                                                <div className="flex flex-col gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="65" viewBox="0 0 432 91"><path d="M74.5 49.5c1.6 2.8 2.5 6.3 2.5 10.4v.2c0 4.2-.8 8-2.5 11.4-1.7 3.4-4.1 6.2-7.1 8.6-3.1 2.3-6.8 4.1-11.2 5.4-4.4 1.3-9.3 1.9-14.7 1.9-8.2 0-15.9-1.1-23-3.4S5.3 78.3.2 73.8l14.4-17.1c4.4 3.4 9 5.8 13.8 7.2 4.8 1.5 9.6 2.2 14.4 2.2 2.5 0 4.2-.3 5.3-.9 1.1-.6 1.6-1.5 1.6-2.5v-.2c0-1.2-.8-2.1-2.4-2.9-1.6-.8-4.5-1.6-8.8-2.4-4.5-.9-8.8-2-12.9-3.2-4.1-1.2-7.7-2.8-10.8-4.7-3.1-1.9-5.6-4.3-7.4-7.2-2-3.1-2.9-6.7-2.9-10.9V31c0-3.8.7-7.4 2.2-10.7 1.5-3.3 3.7-6.2 6.6-8.6 2.9-2.5 6.5-4.4 10.7-5.8 4.2-1.4 9.1-2.1 14.7-2.1 7.8 0 14.7.9 20.5 2.8 5.9 1.8 11.1 4.6 15.8 8.3L61.9 33c-3.8-2.8-7.9-4.8-12.1-6.1-4.3-1.3-8.3-1.9-12-1.9-2 0-3.5.3-4.4.9-1 .6-1.4 1.4-1.4 2.4v.2c0 1.1.7 2 2.2 2.8 1.5.8 4.3 1.6 8.5 2.4 5.1.9 9.8 2 14 3.3 4.2 1.3 7.8 3 10.9 5 2.9 2.2 5.3 4.6 6.9 7.5zm1-21.4h23.7v57.8h26.9V28.1h23.7V5.3H75.5v22.8zM387.9.3l-43.3 85.6h25.8l17.5-34.6 17.6 34.6h25.8L387.9.3zM267.3.3l43.4 85.6h-25.8l-17.5-34.6-17.5 34.6h-48.2l-15.2-23h-5.7v23h-26.9V5.3H193c7.2 0 13.1.8 17.8 2.5 4.6 1.6 8.4 3.9 11.2 6.7 2.5 2.4 4.3 5.2 5.5 8.3 1.2 3.1 1.8 6.7 1.8 10.8v.2c0 5.9-1.4 10.9-4.3 14.9-2.8 4.1-6.7 7.3-11.6 9.7l14 20.4L267.3.3zm-64.8 35.3c0-2.6-.9-4.5-2.8-5.8-1.8-1.3-4.3-1.9-7.5-1.9h-11.7v15.8h11.6c3.2 0 5.8-.7 7.6-2.1 1.8-1.4 2.8-3.3 2.8-5.8v-.2zM345.2 5.3 327.6 40 310 5.3h-25.8l43.4 85.6 43.3-85.6h-25.7z" style={{fill: "rgb(252, 76, 2)"}}></path></svg>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-semibold">{mountainActivity.name}</h3>
                                                        <p className="text-neutral-500 text-base">{formatDateLongWithTime(mountainActivity.start_date_local)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <svg data-id="32" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>
                                                            <div className="font-medium text-base">Distància:</div>
                                                        </div>
                                                        <span className="text-base font-semibold">{formatDistance(mountainActivity.distance)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <svg data-id="14" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                            <div className="font-medium text-base">Temps en moviment:</div>
                                                        </div>
                                                        <span className="text-base font-semibold">{formatTime(mountainActivity.moving_time)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <svg data-id="26" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                                                            <div className="font-medium text-base">Velocitat mitjana:</div></div>
                                                        <span className="text-base font-semibold">{convertSpeedToKmh(mountainActivity.average_speed)} km/h</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foregorund">
                                                        <div className="flex items-center gap-2">
                                                            <svg data-id="4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg>
                                                            <div className="font-medium text-base">Desnivell positiu:</div>
                                                        </div>
                                                        <span className="text-base font-semibold">{Math.round(mountainActivity.total_elevation_gain)} m</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <a className="text-base hover:underline text-[#737373]" href={`https://strava.com/activities/${mountainActivity.id}`}
                                                    target="_blank"
                                                       rel="noreferrer"
                                                    >
                                                        Veure més
                                                    </a>
                                                </div>
                                            </div>
                                            )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Drawer>
);
}

export default MountainDetail;


