import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;

    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiHost || !apiKey) {
        throw new Error("O host da API ou a chave da API está vazia.");
    }

    const headers = {
        "X-RapidAPI-Host": apiHost,
        "X-RapidAPI-Key": apiKey,
    };

    const response = await fetch(
        `https://${apiHost}/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        { headers: headers }
    );

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append("customer", "hrjavascript-mastery");
    url.searchParams.append("make", make);
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("modelYear", `${year}`);
    url.searchParams.append("angle", `${angle}`);

    return `${url}`;
};
