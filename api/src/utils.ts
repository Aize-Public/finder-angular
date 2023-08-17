export function isDateValid(dateString: string) {
    const parsedDate = new Date(dateString);
    return !isNaN(parsedDate.getTime());
}


export function applyFilters(results, filters) {
    if (!filters || filters.length === 0) {
        return results;
    }
    const applicableFilters = filters.filter(
        (filter) =>
            filter?.selection?.length > 0 ||
            filter.value ||
            (filter.min && filter.max)
    );
    if (!applicableFilters || applicableFilters.length === 0) {
        return results;
    }

    return results.filter((data) => {
        return applicableFilters.every((filter) => {
            switch (filter.type) {
                case "string": {
                    const values = filter.selection?.map((data) => data.value) || [];
                    return values.length === 0 || values.includes(data[filter.label]);
                }
                case "number": {
                    const valueInData = data[filter.label];
                    return (
                        !filter.value ||
                        (valueInData > filter.rangeMin && valueInData <= filter.value)
                    );
                }
                case "date": {
                    const valueInData = new Date(data[filter.label]).getTime();
                    const minDate = new Date(filter.min).getTime();
                    const maxDate = new Date(filter.max).getTime();
                    return (
                        !filter.min ||
                        !filter.max ||
                        (valueInData > minDate && valueInData <= maxDate)
                    );
                }
                default: {
                    return true;
                }
            }
        });
    });
}
