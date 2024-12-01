interface User{
    id: string;
    name: string;
    arts: Art[];
    banned: boolean;
    status: Status;
    background: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Status{
    id: string;
    followers: User[];
    following: User[];
    artworkCount: number;
    artworkLikes: number;
    user: User
}

interface Art{
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    thumbnail: string;
    artwork: string;
    likes: number;
    creatorId: string;
    creator: User;
    comment: Comment[];
}


interface Comment{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    user: User;
}