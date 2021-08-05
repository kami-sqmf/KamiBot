export interface returnValue {
    success: boolean
    error?: any
    data?: Map<string, any>
}

export interface tempValue {
    global: Map<string, any> | undefined
    guilds: Map<string, any> | undefined
    users: Map<string, any> | undefined
}
