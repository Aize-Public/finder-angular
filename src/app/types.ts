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
    [K in keyof SearchDataType]: FilterDataType
};

export type FilterDataType = {
    dataType: string;
    values: Array<string | number>;
    min?: number | undefined;
    max?: number | undefined;
}

export type SearchResponse = {
    results: Array<SearchDataType>,
    hits?: number;
    aggregations?: {
        [K in keyof SearchDataType]: Record<string, number> | { min: number, max: number };
    };
    stats?: {
        [K in keyof SearchDataType]: Record<string, number> | { min: number, max: number };
    };
}

export type Filters = Pick<SearchResponse, "aggregations" | "stats">;

export type SearchRequest = {
    query: string;
    aggregate: string;
    stats: string;
    size?: number;
    offset?: number;
    filters: FilterResponse;
}

export type FilterResponse = {
    label: string;
    type: string;
    options?: {
        id: string;
        name: string;
        value: string;
    }[];
    rangeMin?: number;
    rangeMax?: number;
    selection?: {
        id: string;
        name: string;
        value: string;
    }[];
    min?: number;
    max?: number;
    value?: number;
}

export type FilterRequest = {
    query?: string,
    aggregate?: string,
    stats?: string,
    filters?: FilterPayload[]
}

export type FilterPayload = {
    label: string,
    type: string,
    options?: { name: string, value: string }[],
    selection?: { name: string, value: string }[],
    value?: number,
    rangeMin?: number,
    rangeMax?: number
    min?: number,
    max?: number
}