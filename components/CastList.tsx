import * as React from 'react';
import Image from 'next/image'

type Props = {
    showID: number,
    seasonNum: number,
    episodeNum: number,
}

type CastMember = {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: Department;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    character?:           string;
    credit_id:            string;
    order?:               number;
    job?:                 string;
    department?:          Department;
}

export enum Department {
    Acting = "Acting",
    Directing = "Directing",
    Writing = "Writing",
}
 
const CastList: React.FC<Props> = ({showID, seasonNum, episodeNum}) => {

    const [castList, setCastList] = React.useState<CastMember[]>([])

    React.useEffect(() => {
        // call for cast list
        getCastList(showID, seasonNum, episodeNum).then(res => {
            setCastList(res);
        });

    }, []);

    const getCastList = async (tv_id:number, season_number:number, episode_number:number) => {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits?api_key=b266704b1a8e284b85f455fc1050f942&language=en-US`)
        const data = await res.json();

        // if resource could not be found, return empty array
        if (res.status === 404 || data.results?.length === 0) return []

        // otherwise, return the resulting cast list
        return data.cast
    }

    return (
        <div className='w-min sm:w-full mx-auto mt-10 sm:flex sm:gap-10 sm:flex-nowrap sm:overflow-x-auto'>

            {castList.map(actor => 
                <div key={actor.name} id='actorCard' className='w-[175px] bg-gray-100 rounded-lg my-4 shadow-sm'>
                    {(actor.profile_path) &&
                    <div id='headshotCont' className='w-[175px] h-[290.5px] relative'>
                        <Image className='rounded-t-lg' layout='fill' objectFit='cover' src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} priority/>
                    </div>}
                    <div id="actorDesc" className="p-4">
                        <p className='font-semibold'>{actor.name}</p>
                        <p className='italic'>{actor.character}</p>
                    </div>
                
                </div>
            )}           

        </div>
    );
}
 
export default CastList;
