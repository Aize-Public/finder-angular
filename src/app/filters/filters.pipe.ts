import { Pipe, PipeTransform } from "@angular/core";
import { FiltersType, Filters, FilterDataType } from "../types";

@Pipe({
    name: 'activeFilters',
    standalone: true
})
export class ActiveFiltersPipe implements PipeTransform {
    transform(value: [string, {
        dataType: string;
        values: (string | number)[];
        min?: number | undefined;
        max?: number | undefined;
    }][], arg: Array<string>) {
        return value.filter(filter => arg.includes(filter[0] as keyof FiltersType))
    }
}

@Pipe({
    name: 'updateFilters',
    standalone: true
})
export class UpdateFiltersPipe implements PipeTransform {
    transform(values: string[], filters: Filters, filterLabel: keyof FiltersType) {
        if (filters.aggregations && filterLabel in filters.aggregations) {
            return Object.keys(filters.aggregations[filterLabel]);
        }
        return values;
    }
}


@Pipe({
    name: 'availableFilters',
    standalone: true
})
export class AvailableFiltersPipe implements PipeTransform {
    transform(values: [string, FilterDataType][]) {
        return values.flatMap(value => value[0]);
    }
}