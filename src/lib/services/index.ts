//---------- BARREL FILE ----------//

import { UserService } from '@/lib/services/_internals/user'
import { BrandService } from '@/lib/services/_internals/brand'
import { ColorFilterService } from '@/lib/services/_internals/colorFilter'
import { DestinationService } from '@/lib/services/_internals/destination'
import { OrderService } from '@/lib/services/_internals/order'
import { SizeService } from '@/lib/services/_internals/size'
import { ProductService } from '@/lib/services/_internals/product'

class Service {
  readonly user = new UserService()
  readonly brand = new BrandService()
  readonly color = new ColorFilterService()
  readonly destination = new DestinationService()
  readonly order = new OrderService()
  readonly size = new SizeService()
  readonly product = new ProductService()
}

export const service = new Service() // use exemple: await service.user.getUsers()
