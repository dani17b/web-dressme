import { Skeleton } from "@nextui-org/react";

interface OutfitProps {
    outfit :  any;
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
    const { outfit } = props;

    return (
        <div className="flex mb-4">
            {outfit.length == 0 &&
                <OutfitArticle article={null} />
            }
            {outfit.map((article: any) => (
                <OutfitArticle article={article} key={article.key}/>
            ))}
        </div>
    );

}


export const Outfit = (props : OutfitProps) => {
    const { outfit } = props;

    return (
        <div className="flex flex-col items-center">
            <OutfitRow outfit={outfit.torso} />
            <OutfitRow outfit={outfit.legs} />
            <OutfitRow outfit={outfit.feet} />
        </div>
    );

}