export interface SubMenu{
    title: string,
    items: SubMenuItem[]
}

export interface SubMenuItem{
    name: string,
    content: string,
    path: string,
    icon: string,
}