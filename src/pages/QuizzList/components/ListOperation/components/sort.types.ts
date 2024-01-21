export enum ESortType {
    NEWEST = "createdAt,DESC",
    OLDEST = "createdAt,ASC",
    MOST_POPULAR = "finished,DESC",
    LEAST_POPULAR = "finished,ASC",
    MOST_LIKED = "liked,DESC",
    LEAST_LIKED = "liked,ASC",
}
