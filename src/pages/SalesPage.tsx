import { ProductPage } from '@/components/templates/ProductPage'
import { salesConfig } from '@/data/products'

export function SalesPage() {
  return <ProductPage config={salesConfig} />
}
