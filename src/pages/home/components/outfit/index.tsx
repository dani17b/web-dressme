import { Skeleton } from "@nextui-org/react";

interface OutfitProps {
    outfit :  any;
    loading : boolean;
}

const OutfitArticle = (props : any) => {
    const { article } = props;

    return (
        <div style={{
            width: 100,
            height: 100,
        }}>
            {article == null &&
                <div className="w-full h-full">
                    <Skeleton isLoaded={false} className="w-full h-full">
          <div className="h-24 rounded-lg bg-secondary"></div>
        </Skeleton>
                </div>
            }
            {article != null &&
                <img src={article.photoUrl} className="w-full h-full object-cover"/>
            }
        </div>
    );
}

const OutfitRow = (props : any) => {
    const { outfit, loading } = props;


    return (
        <div className="flex mb-4">
            {(outfit.length == 0 || loading) &&
                <OutfitArticle article={null} />
            }
            {!loading && outfit.map((article: any) => (
                <OutfitArticle article={article} key={article.key}/>
            ))}
        </div>
    );

}


export const Outfit = (props : OutfitProps) => {
    const { outfit, loading } = props;

    return (
        <div className="flex flex-col items-center">
            <OutfitRow outfit={outfit.torso} loading={loading}/>
            <OutfitRow outfit={outfit.legs} loading={loading}/>
            <OutfitRow outfit={outfit.feet} loading={loading}/>
        </div>
    );

}