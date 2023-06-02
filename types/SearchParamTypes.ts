type Params = {
  id: string
}

export type SearchParams = {
  name: string
  unit_amount: number | null
  image: string
  id: string
  description: string | null
  features: string
}

export type SearchParamTypes = {
  params: Params
  searchParams: SearchParams
}
