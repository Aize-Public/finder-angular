export type SearchDataType = {
    "SET POINT HIGH HIGH": number;
    "sapParentAvevaExternalId": string;
    "Issued By": string;
    "SAP OBJECT TYPE": string;
    "HAZARDOUS ATEX MARKING": string;
    "PART NUMBER": string;
    "source": string;
    "flocBarrierElementPrimary": string;
    "CALIBRATED RANGE MAX_UOM": string;
    "SERIAL NUMBER": string;
    "SIGNAL TYPE": string;
    "HAZARDOUS AREA CERT NUMBER": string;
    "createdTime": string;
    "SUPPLY CODE": string;
    "state": string;
    "id": number;
    "flocFunctionalLocation": string;
    "WEIGHT (DRY)": number;
    "MODEL NUMBER": string;
    "I/O TYPE": string;
    "System": string;
    "Discipline": string;
    "HAZARDOUS AREA TEMP RATING (AS REQUIRED)": string;
    "PARENT TAG": string;
    "flocSystemId": number;
    "SET POINT HIGH HIGH_UOM": string;
    "flocLocation": string;
    "SAP CATALOG PROFILE": string;
    "FIRE AREA": string;
    "CALIBRATED RANGE MAX": number;
    "LAST MAINTENANCE DATE": string;
    "CALIBRATION DATE": string;
    "LAST INSPECTION DATE": string;
};


export type FiltersType = {
    [K in keyof SearchDataType]: {
        dataType: string,
        values: Array<string | number>,
        min?: number,
        max?: number
    }
};

export type SearchResponse = {
    results: Array<SearchDataType>,
    hits?: number;
    aggregations?: {
        [key: string]: Record<string, number> | { min: number, max: number };
    };
    stats?: {
        [key: string]: Record<string, number> | { min: number, max: number };
    };
}