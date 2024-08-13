export interface returnValue {
    success: boolean
    error?: any
    data?: Map<string, any>
}


export type CacheType = 'global' | 'guilds' | 'users';

export interface Cache {
    [key: string]: Map<string, any>
}
