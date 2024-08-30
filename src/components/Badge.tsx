import {CustomFlowbiteTheme} from "flowbite-react";
import {Badge as FlowbiteBadge, BadgeProps as FlowbiteBadgeProps} from "flowbite-react";

import React from "react";

interface BadgeProps extends FlowbiteBadgeProps {}

const Badge = ({ children, ...props}: BadgeProps) => {

    const customTheme: CustomFlowbiteTheme["badge"] = {
        "root": {
            "color": {
                "black": "bg-black text-white",
                "green": "bg-green-100 text-[#16a34a]",
                "gray": "bg-gray-100 text-black",
            },
            "size": {
                "sm": "text-base",
            }
        }
    }

    return (<FlowbiteBadge theme={customTheme} {...props}>
        {children}
    </FlowbiteBadge>);
}

export default Badge;