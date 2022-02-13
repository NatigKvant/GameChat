export interface Config {
    id: number
    path: string
    name: string
}

export interface Language {
    id: number
    value: string
    name: string
}

export interface TopPropsType {
    appResize: () => void
    windowSize: boolean
}

export interface DropDownPropsType {
    languages: Language[]
}