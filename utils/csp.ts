/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { promptToRestart } from "@utils/promptToRestart";
import { useAwaiter, useForceUpdater } from "@utils/react";
import { showToast } from "@webpack/common";

export function useCspPermission(url: string | undefined, directives: string[], callerName: string) {
    const [signal, forceUpdate] = useForceUpdater(true);
    const [isAllowed] = useAwaiter(
        async () => IS_WEB || !url || !URL.canParse(url) || VencordNative.csp.isDomainAllowed(url, directives),
        { fallbackValue: true, deps: [url, signal] }
    );

    const requestPermission = async () => {
        if (!url) return;

        const result = await VencordNative.csp.requestAddOverride(url, directives, callerName);
        if (result === "ok") {
            forceUpdate();
            promptToRestart("relaunch");
        } else if (result !== "cancelled") {
            showToast({ text: "Could not allow this domain.", variant: "critical" });
        }
    };

    return [isAllowed, requestPermission] as const;
}
