// this acts the item that gets added to the cart 

export type AddCartType = {
  name: string
  image: string
  id:string
  quantity?: number | 1
  unit_amount: number | null
}
