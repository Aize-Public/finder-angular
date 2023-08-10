export function parseValue(value: any): {
    dataType: string;
    parsedValue: any
} {
    if (typeof value === "number") {
        return {
            dataType: "number",
            parsedValue: value,
        };
    }

    if (typeof value === "string") {
        if (!isNaN(Number(value))) {
            return {
                dataType: "number",
                parsedValue: parseFloat(value),
            };
        }

        if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
            return {
                dataType: "boolean",
                parsedValue: value.toLowerCase() === "true",
            };
        }

        try {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
                return {
                    dataType: "date",
                    parsedValue: parsedDate.getTime(),
                };
            }
        } catch (error) {
            console.error("Error parsing date value:", value);
            console.error(error);
        }
    }

    return {
        dataType: "string",
        parsedValue: value.toString(),
    };
}