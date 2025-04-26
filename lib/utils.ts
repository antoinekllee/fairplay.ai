import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import qs from "query-string";

export function formUrlQuery({
    params,
    key,
    value,
}: {
    params: string;
    key: string;
    value: string | null;
}) {
    const currentUrl = qs.parse(params);

    currentUrl[key] = value;

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    );
}

export function removeKeysFromQuery({
    params,
    keysToRemove,
}: {
    params: string;
    keysToRemove: string[];
}) {
    const currentUrl = qs.parse(params);

    keysToRemove.forEach((key) => {
        delete currentUrl[key];
    });

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    );
}

export function formUrlQueryMultiple({
    params,
    updates,
}: {
    params: string;
    updates: { key: string; value: string | null }[];
}) {
    const currentUrl = qs.parse(params);

    updates.forEach(({ key, value }) => {
        currentUrl[key] = value;
    });

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    );
}

export function stringifySearchParams(
    searchParams: Record<string, string | string[] | undefined>
): string {
    const urlSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        if (typeof value === "string") {
            urlSearchParams.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((v) => urlSearchParams.append(key, v));
        }
    }

    return urlSearchParams.toString();
}

export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric", // numeric day of the month (e.g., '25')
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };

    const shortDateTimeOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    const shortTimeOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
    };

    const formattedDateTime: string = new Date(dateString).toLocaleString(
        "en-US",
        dateTimeOptions
    );

    const formattedDate: string = new Date(dateString).toLocaleString(
        "en-US",
        dateOptions
    );

    const formattedTime: string = new Date(dateString).toLocaleString(
        "en-US",
        timeOptions
    );

    const formattedShortDateTime: string = new Date(dateString).toLocaleString(
        "en-GB",
        shortDateTimeOptions
    );

    const formattedShortTime: string = new Date(dateString).toLocaleString(
        "en-US",
        shortTimeOptions
    );

    return {
        dateTime: formattedDateTime,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
        shortDateTime: formattedShortDateTime,
        shortTime: formattedShortTime,
    };
};
