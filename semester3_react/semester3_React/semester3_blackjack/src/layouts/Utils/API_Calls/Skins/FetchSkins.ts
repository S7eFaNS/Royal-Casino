/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SkinModel from "../../../../models/SkinModel"
import { Localhost } from "../Localhost";

export const useFetchSkins = () => {

const [skins, setSkins] = useState<SkinModel[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [httpError, setHttpError] = useState(null);

useEffect(() =>{
    const fetchSkins = async () => {
        const baseUrl : string = `${Localhost}/api/skins`;

        const url : string = `${baseUrl}?page=0&size=9`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Something went wrong"); 
        }

        const responseJson = await response.json();

        const responseData = responseJson._embedded.skins;

        const loadedSkins : SkinModel[] = [];

        for(const key in responseData){
            loadedSkins.push({
                id : responseData[key].id,
                name : responseData[key].name,
                price : responseData[key].price,
                description : responseData[key].description,
                img : responseData[key].img,
            });
        }
        setSkins(loadedSkins);
        setIsLoading(false);
    };
    fetchSkins().catch((error:any) =>{
        setIsLoading(false);
        setHttpError(error.message);
    });
}, []);
return { skins, isLoading, httpError };
}