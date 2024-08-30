import React, { useEffect, useMemo, useState } from "react";
import { Mountain } from "@interfaces/Mountain";
import { Ascent } from "@interfaces/Ascent";
import { CustomFlowbiteTheme, Progress } from "flowbite-react";

interface StatsProps {
    mountains: Mountain[];
    ascents: Ascent[];
    selectedMountain: Mountain | undefined;
}

function Stats({ mountains, ascents, selectedMountain }: StatsProps) {
    const [showStats, setShowStats] = useState(false);

    const customTheme: CustomFlowbiteTheme["progress"] = {
        color: {
            black: "bg-black",
            green: "bg-[#16a34a]",
        },
        size: {
            md: "h-2",
        },
    };

    const percentage100Cims = useMemo(() => {
        if (!ascents.length) return 0;
        return +((ascents.length / 100) * 100).toFixed(2);
    }, [ascents]);

    const percentageTotalCims = useMemo(() => {
        if (!ascents.length) return 0;
        return +((ascents.length / mountains.length) * 100).toFixed(2);
    }, [ascents, mountains]);

    useEffect(() => {
        if (!selectedMountain) return;
        setShowStats(false);
    }, [selectedMountain]);

    if (!mountains || !ascents) return null;

    return (
        <div className="absolute bottom-4 right-4 left-4 z-[420] flex flex-col gap-4">
            <div
                className={`w-full self-end max-w-[392px] rounded-lg border bg-white p-4 text-card-foreground shadow-lg relative transition-all duration-500 ease-in-out transform ${
                    showStats ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-[8px]">
                    <div className="flex justify-between items-center">
                        <button
                            className="absolute right-2 top-2 text-black hover:text-gray-500"
                            onClick={() => setShowStats(false)}
                        >
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
                        <h2 className="text-lg font-bold">Estadístiques</h2>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center justify-between">
              <span className="text-base font-medium">
                Repte 100 cims{" "}
                  <span className="text-neutral-500 text-sm">
                  ({ascents.length}/100)
                </span>
              </span>
                            <span className="text-muted-foreground text-base">
                {percentage100Cims}%
              </span>
                        </div>
                        <Progress
                            theme={customTheme}
                            progress={percentage100Cims}
                            color="green"
                        />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center justify-between">
              <span className="text-base font-medium">
                Total cims{" "}
                  <span className="text-neutral-500 text-sm">
                  ({ascents.length}/{mountains.length})
                </span>
              </span>
                            <span className="text-muted-foreground text-base">
                {percentageTotalCims}%{" "}
              </span>
                        </div>
                        <Progress
                            theme={customTheme}
                            progress={percentageTotalCims}
                            color="green"
                        />
                    </div>
          {/*          <span className="text-neutral-500 text-xs mt-1">*/}
          {/*  Última actualització: Ago 10, 2024*/}
          {/*</span>*/}
                </div>
            </div>

            {/* Floating Button */}
            <button
                className="p-3 bg-black rounded-full hover:bg-gray-800 transition-colors w-min self-end"
                onClick={() => setShowStats(!showStats)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                >
                    <line x1="12" x2="12" y1="20" y2="10"></line>
                    <line x1="18" x2="18" y1="20" y2="4"></line>
                    <line x1="6" x2="6" y1="20" y2="16"></line>
                </svg>
                <span className="sr-only">View statistics</span>
            </button>
        </div>
    );
}

export default Stats;
