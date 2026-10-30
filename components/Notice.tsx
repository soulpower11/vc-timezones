/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./Notice.css";

import { classNameFactory } from "@utils/css";
import { classes } from "@utils/misc";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const cl = classNameFactory("vc-timezones-notice-");

export type NoticeProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
    children: ReactNode;
    variant?: "info" | "warning" | "danger" | "positive";
    action?: ReactNode;
};

export function Notice({ children, variant = "info", action, className, ...props }: NoticeProps) {
    return (
        <div className={classes(cl("container", variant), className)} {...props}>
            <div className={cl("text")}>{children}</div>
            {action && <div className={cl("action")}>{action}</div>}
        </div>
    );
}
