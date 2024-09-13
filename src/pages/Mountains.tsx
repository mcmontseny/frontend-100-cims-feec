import React, {useCallback, useEffect, useRef, useState} from "react";
import {Mountain} from "@interfaces/Mountain";
import Badge from "@components/Badge";

const MAX_MOUNTAINS_TO_SHOW = 25;

function MountainsPage() {
    const observerRef = useRef<HTMLDivElement | null>(null);

    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [currentMountains, setCurrentMountains] = useState<Mountain[]>([]);


    const fetchData = async () => {
        fetch("https://backend-100-cims-feec-production.up.railway.app/api/v1/mountains")
            .then(response => response.json())
            .then(data => setMountains(data))
            .catch(error => console.error(error));
    }

    const loadMoreMountains = useCallback( () => {
        if (currentMountains.length === mountains.length) return;
        setCurrentMountains((prev) => [
            ...prev,
            ...mountains.slice(prev.length, prev.length + MAX_MOUNTAINS_TO_SHOW)]
        );
    }, [currentMountains, mountains]);

    useEffect(() => {
        fetchData().then();
    }, []);

    useEffect(() => {
        if (!mountains.length) return;
        setCurrentMountains(mountains.slice(0, MAX_MOUNTAINS_TO_SHOW));
    }, [mountains]);

    useEffect(() => {
        const node = observerRef.current;
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || !node) return;

        const observer = new IntersectionObserver(([entry]) => {
            console.log('Intersecting:', entry.isIntersecting);
            console.log('BoundingClientRect:', entry.boundingClientRect);

            if (entry.isIntersecting) {
                loadMoreMountains();
            }
        }, {
            threshold: 0,
            root: null
        });

        observer.observe(node);

        return () => {
            if (!observer) return;
            observer.disconnect();
        };
    }, [loadMoreMountains]);

    return (
        <div className="flex flex-col gap-3 py-6 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-1 px-6">
                <h1 className="whitespace tracking-tight text-2xl font-bold">Llistat de cims</h1>
                <span className="text-neutral-500 text-sm">Aquest llistat conté tots els cims del repte dels 100 Cims. Fes clic a un cim per descobrir-ne els detalls i preparar-te per noves aventures.</span>
            </div>


                <div className="flex flex-row justify-between items-center mt-1 pt-4 px-6 border-t-[1px] border-neutral-100">
                    {!!mountains.length && (<span className="text-neutral-500 text-sm">{mountains.length} Cims</span>)}
                    {!mountains.length && (<div className="h-[20px] bg-gray-200 dark:bg-gray-700 w-[61px] animate-pulse rounded"></div>)}

                    <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5M14 5H20M10 5L4 5M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM16 12H4M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19ZM8 19H20" stroke="#1A1A14" strokeLinecap="round"></path></svg>
                        <span className="text-sm">Filtres</span>
                    </div>
                </div>


            <div className="flex flex-col gap-4 px-6">
                {!currentMountains.length && (
                    Array.from({length: 10}).map((_, index) => (
                        <div className="rounded-lg border shadow-sm h-[170px] bg-gray-200 dark:bg-gray-700 w-full animate-pulse flex flex-col" key={index}>
                            <div className="flex flex-col justify-between h-full p-4">
                                <div className="flex gap-[6px]">
                                    <div className=" rounded h-[24px] bg-gray-300 dark:bg-gray-600 w-[74px]"></div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="h-[28px] bg-gray-300 dark:bg-gray-600 w-[166px] rounded"></div>
                                    <div className="h-[20px] bg-gray-300 dark:bg-gray-600 w-[48px] rounded"></div>
                                    <div className="h-[20px] bg-gray-300 dark:bg-gray-600 w-[80px] rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {currentMountains.map((mountain) => (
                    <>
                        <div className="relative rounded-lg border shadow-sm flex flex-col bg-cover bg-center h-[170px]"
                        style={{backgroundImage: `url('${mountain.image}')`}}>
                            <div className="absolute inset-0 bg-black rounded-lg" style={{opacity: '0.25'}}></div>

                            <div className="flex flex-col justify-between h-full p-4 z-10">
                                <div className="flex gap-[6px]">
                                    <Badge color={mountain.essencial ? 'black' : 'gray'}>
                                        Cim {mountain.essencial ? 'essencial' : 'bàsic'}
                                    </Badge>
                                    {/*{false && (<Badge color="green" size="sm">*/}
                                    {/*    Completat*/}
                                    {/*</Badge>)}*/}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="whitespace tracking-tight text-xl font-bold text-white">{mountain.name}</h3>
                                    <span className="text-white text-sm">{mountain.height} m</span>
                                    <span className="text-white text-sm">{mountain.region}</span>

                                    {/*<div className="flex items-center gap-1">*/}
                                    {/*    <svg*/}
                                    {/*        data-id="16"*/}
                                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*        width="24"*/}
                                    {/*        height="24"*/}
                                    {/*        viewBox="0 0 24 24"*/}
                                    {/*        fill="none"*/}
                                    {/*        stroke="white"*/}
                                    {/*        strokeWidth="2"*/}
                                    {/*        strokeLinecap="round"*/}
                                    {/*        strokeLinejoin="round"*/}
                                    {/*        className="w-5 h-5"*/}
                                    {/*    >*/}
                                    {/*        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>*/}
                                    {/*        <circle cx="12" cy="10" r="3"></circle>*/}
                                    {/*    </svg>*/}
                                    {/*    <span className="text-sm text-white">{mountain.region}</span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </>
                ))}
                <div ref={observerRef} style={{height: '10px'}}></div>
            </div>

        </div>
    );
}

export default MountainsPage;