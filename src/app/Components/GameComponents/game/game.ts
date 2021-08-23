export interface Game {
    GameId:number,
    Title :string,
    Photo :string,
    Trailer :string,
    Description :string,
    Pegi :Pegi,
    ReleaseDate :Date,
    IsReleased :boolean,
    IsEarlyAccess :boolean,
    Rating:number,
    Tag :string,
    Categories:Category[],
    Developers:Developer[]
}

 interface Category{
    Type:string
}

 interface Developer{
    Name:string
}

export interface Pegi{
    PegiId:number,
    PegiPhoto:string,
    PegiAge:number
}